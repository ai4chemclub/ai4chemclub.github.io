import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const contentUrl = new URL('../src/data/club.json', import.meta.url);

// A small, explicit schema. Unknown fields are rejected so private notes cannot
// silently become part of a public repository's content model.
export function validateContent(data, { release = false } = {}) {
  const errors = [];
  const require = (condition, message) => { if (!condition) errors.push(message); };
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const object = (value, keys, label) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      errors.push(`${label}: expected an object`);
      return false;
    }
    for (const key of Object.keys(value)) require(keys.includes(key), `${label}: unexpected field ${key}`);
    for (const key of keys) require(Object.hasOwn(value, key), `${label}: missing field ${key}`);
    return true;
  };
  const list = (value, label) => {
    require(Array.isArray(value), `${label}: expected an array`);
    return Array.isArray(value) ? value : [];
  };
  const httpsOrNull = value => {
    if (value === null) return true;
    if (typeof value !== 'string') return false;
    try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password; } catch { return false; }
  };
  const dateOnly = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  };

  if (!object(data, ['name', 'shortName', 'tagline', 'description', 'about', 'learningNote', 'activitiesIntro', 'contactEmail', 'affiliation', 'focusAreas', 'activities', 'people', 'release'], 'club')) return errors;
  for (const key of ['name', 'shortName', 'description', 'about', 'learningNote', 'activitiesIntro']) require(text(data[key]), `${key}: required text`);
  const headline = list(data.tagline, 'tagline');
  require(headline.length > 0 && headline.every(text), 'tagline: use one or more nonempty lines');
  require(data.contactEmail === 'ai4chemclub@ust.hk', 'contactEmail: use the approved club contact address');

  if (object(data.affiliation, ['text', 'approvedForPublicUse'], 'affiliation')) {
    require(text(data.affiliation.text), 'affiliation.text: required text');
    require(typeof data.affiliation.approvedForPublicUse === 'boolean', 'affiliation: public-use approval must be boolean');
  }
  const areas = list(data.focusAreas, 'focusAreas');
  require(areas.length > 0, 'focusAreas: at least one area is required');
  areas.forEach((area, i) => {
    if (!object(area, ['title', 'description'], `focusAreas[${i}]`)) return;
    require(text(area.title) && text(area.description), `focusAreas[${i}]: title and description required`);
  });
  list(data.people, 'people').forEach((person, i) => {
    const label = `people[${i}]`;
    if (!object(person, ['name', 'role', 'url', 'approvedForPublicUse'], label)) return;
    require(text(person.name) && text(person.role), `${label}: name and role required`);
    require(person.approvedForPublicUse === true, `${label}: remove unapproved personal data from this repository`);
    require(httpsOrNull(person.url), `${label}: public URL must be HTTPS or null`);
  });
  list(data.activities, 'activities').forEach((activity, i) => {
    const label = `activities[${i}]`;
    if (!object(activity, ['title', 'summary', 'status', 'relationship', 'date', 'location', 'url', 'copyApproved'], label)) return;
    require(text(activity.title) && text(activity.summary), `${label}: title and summary required`);
    require(['planning', 'upcoming', 'completed'].includes(activity.status), `${label}: invalid status`);
    require(['club-organized', 'external-participation'].includes(activity.relationship), `${label}: specify the club's relationship to the event`);
    require(httpsOrNull(activity.url), `${label}: event URL must be HTTPS or null`);
    require(activity.location === null || text(activity.location), `${label}: location must be text or null`);
    require(typeof activity.copyApproved === 'boolean', `${label}: copyApproved must be boolean`);
    if (activity.status === 'planning') {
      require(activity.date === null && activity.location === null, `${label}: planning entries must not claim a confirmed date or venue`);
    } else {
      require(dateOnly(activity.date), `${label}: a scheduled or completed event needs a valid YYYY-MM-DD date`);
    }
    if (release) require(activity.copyApproved === true, `${label}: public wording has not been approved`);
  });
  if (object(data.release, ['copyApproved', 'languageConfirmed', 'launchApproved'], 'release')) {
    for (const key of ['copyApproved', 'languageConfirmed', 'launchApproved']) {
      require(typeof data.release[key] === 'boolean', `release.${key}: expected boolean`);
      if (release) require(data.release[key] === true, `release.${key}: not confirmed`);
    }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const release = process.argv.includes('--release');
    const errors = validateContent(JSON.parse(readFileSync(contentUrl, 'utf8')), { release });
    if (release) {
      try {
        const url = new URL(process.env.SITE_URL || '');
        if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error();
      } catch { errors.push('SITE_URL: set the verified HTTPS origin before publishing'); }
    }
    if (errors.length) {
      console.error(errors.map(error => `- ${error}`).join('\n'));
      process.exitCode = 1;
    } else {
      console.log(release ? 'Release content checks passed.' : 'Draft content checks passed. This does not authorize publication.');
    }
  } catch (error) {
    console.error(`Unable to validate club.json: ${error.message}`);
    process.exitCode = 1;
  }
}
