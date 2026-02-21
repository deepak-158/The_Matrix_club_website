-- Seed Data
-- Run: wrangler d1 execute matrix-club-db --file=./seed.sql

INSERT INTO events (title, date, description, attendees, status, image_url, gallery_url)
VALUES (
  'Media Morphosis 2025',
  '2025-07-27',
  'Matrix Club in partnership with Unstop hosted Media Morphosis at VIT Bhopal. The event explored how Data Science and Social Media Analytics shape branding and business strategies.',
  '200',
  'completed',
  'https://res.cloudinary.com/dfc9sgywk/image/upload/f_auto,q_auto,w_600/matrix-club/events/MediaMorphosis/Media_Morphosis',
  'https://www.instagram.com/p/DMaeyxZtH1i/'
);

INSERT INTO events (title, date, description, attendees, status, image_url, gallery_url)
VALUES (
  'AIRM 2025',
  '2025-12-30',
  'Matrix Club hosted AIRM 2025 — an online event for college students focused on Artificial Intelligence, Robotics, and Multimedia. With over 100 participants, the session delivered valuable insights through expert talks.',
  '150',
  'completed',
  'https://res.cloudinary.com/dfc9sgywk/image/upload/f_auto,q_auto,w_600/matrix-club/events/AIRM1/AIRM_2025',
  'https://www.instagram.com/p/DS1e_hXEr5s/'
);

INSERT INTO events (title, date, description, attendees, status, image_url, gallery_url)
VALUES (
  'AIRM 2 — 2026',
  '2026-02-07',
  'Matrix Club hosted AIRM 2 on 7 February — an online event for college students focused on Artificial Intelligence, Robotics, and Multimedia with expert talks and interactive discussions.',
  '200+',
  'completed',
  NULL,
  'https://www.instagram.com/p/DS1e_hXEr5s/'
);

INSERT INTO announcements (title, message, link, link_text, is_active)
VALUES (
  '✅ Recruitment Cycle Completed!',
  'Thank you for your interest in The Matrix Club! Our recruitment for this cycle has ended. Stay connected for future opportunities!',
  '/recruitment',
  'View Details',
  1
);
