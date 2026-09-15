import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateContent } from './check-content.mjs';

const draft = () => ({
  ...JSON.parse(readFileSync(new URL('../src/data/club.json', import.meta.url), 'utf8')),
  people: [],
  activities: [{ title: 'Test workshop', summary: 'A test-only planned activity.', status: 'planning', relationship: 'club-organized', date: null, location: null, url: null, copyApproved: false }],
  release: { copyApproved: false, languageConfirmed: false, launchApproved: false },
});

test('an unapproved draft cannot pass the release gate', () => {
  assert.deepEqual(validateContent(draft()), []);
  assert.ok(validateContent(draft(), { release: true }).some(error => error.includes('launchApproved')));
});

test('planning entries cannot silently acquire an invented schedule', () => {
  const content = draft();
  content.activities[0].date = '2026-10-01';
  assert.ok(validateContent(content).some(error => error.includes('confirmed date or venue')));
});

test('unapproved personal information is rejected even for a local draft', () => {
  const content = draft();
  content.people.push({ name: 'Test Person', role: 'Test role', url: null, approvedForPublicUse: false });
  assert.ok(validateContent(content).some(error => error.includes('remove unapproved personal data')));
});

test('extra fields and credential-bearing URLs cannot enter the content model', () => {
  const content = draft();
  content.internalNotes = 'Test-only field';
  content.activities[0].url = 'https://example-user:example-pass@example.com/';
  const errors = validateContent(content);
  assert.ok(errors.some(error => error.includes('unexpected field internalNotes')));
  assert.ok(errors.some(error => error.includes('URL must be HTTPS')));
});

test('a confirmed external event preserves its identity and validates calendar dates', () => {
  const content = draft();
  content.activities[0].relationship = 'external-participation';
  content.activities[0].status = 'upcoming';
  content.activities[0].date = '2027-02-30';
  assert.ok(validateContent(content).some(error => error.includes('valid YYYY-MM-DD')));
  content.activities[0].date = '2027-02-28';
  content.activities[0].copyApproved = true;
  content.release = { copyApproved: true, languageConfirmed: true, launchApproved: true };
  assert.deepEqual(validateContent(content, { release: true }), []);
});

test('malformed content returns errors instead of crashing', () => {
  assert.ok(validateContent(null).length > 0);
  const content = draft();
  content.people = null;
  content.activities = [null];
  assert.ok(validateContent(content).length >= 2);
});
