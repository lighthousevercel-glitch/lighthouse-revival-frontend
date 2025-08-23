-- Seed sample data for the church management system

-- Insert sample churches
INSERT OR IGNORE INTO churches (id, name, location, pastor_name, contact_email, contact_phone) VALUES
(1, 'Lighthouse Revival Church International', 'Abu Dhabi, UAE', 'Pastor Manoj Thomas', 'info@lighthousechurch.ae', '+971-XX-XXX-XXXX');

-- Insert sample users
INSERT OR IGNORE INTO users (id, email, password_hash, role, church_id) VALUES
(1, 'admin@lighthousechurch.ae', '$2b$10$example_hash', 'super_admin', 1),
(2, 'pastor@lighthousechurch.ae', '$2b$10$example_hash', 'admin', 1),
(3, 'elder@lighthousechurch.ae', '$2b$10$example_hash', 'admin', 1),
(4, 'member@lighthousechurch.ae', '$2b$10$example_hash', 'member', 1);

-- Insert sample members
INSERT OR IGNORE INTO members (id, user_id, name, email, phone, role, status, emirate, country, preferred_service, church_id, joined_at) VALUES
(1, 2, 'Pastor Manoj Thomas', 'pastor@lighthousechurch.ae', '+971-50-123-4567', 'Pastor', 'Active', 'Abu Dhabi', 'India', 'English', 1, '2006-01-01'),
(2, 3, 'Elder Mary Johnson', 'mary@lighthousechurch.ae', '+971-55-987-6543', 'Elder', 'Active', 'Abu Dhabi', 'Philippines', 'English', 1, '2018-03-15'),
(3, NULL, 'John Doe', 'john@example.com', '+971-52-456-7890', 'Active', 'Active', 'Abu Dhabi', 'India', 'English', 1, '2023-01-15'),
(4, NULL, 'Sarah Wilson', 'sarah@example.com', '+971-56-234-5678', 'Active', 'Active', 'Dubai', 'Philippines', 'Tamil', 1, '2022-08-20'),
(5, NULL, 'Michael Johnson', 'michael@example.com', '+971-50-345-6789', 'Active', 'Active', 'Sharjah', 'Nigeria', 'English', 1, '2021-03-10'),
(6, NULL, 'Priya Sharma', 'priya@example.com', '+971-55-456-7890', 'Active', 'Active', 'Abu Dhabi', 'India', 'Hindi', 1, '2023-06-05'),
(7, NULL, 'David Thomas', 'david@example.com', '+971-52-567-8901', 'Lifetime', 'Active', 'Abu Dhabi', 'India', 'Malayalam', 1, '2020-12-01'),
(8, NULL, 'Maria Santos', 'maria@example.com', '+971-56-678-9012', 'Active', 'Active', 'Abu Dhabi', 'Philippines', 'English', 1, '2023-09-10');

-- Insert sample newcomers
INSERT OR IGNORE INTO newcomers (id, name, email, phone, country, language, status, comments, church_id, follow_up_date) VALUES
(1, 'Alice Johnson', 'alice@example.com', '+971-50-111-2222', 'Philippines', 'English', 'Pending', 'Interested in joining the choir ministry', 1, '2024-01-25'),
(2, 'Raj Patel', 'raj@example.com', '+971-55-333-4444', 'India', 'Hindi', 'Approved', 'Looking for Bible study groups', 1, '2024-01-23'),
(3, 'Kumar Krishnan', 'kumar@example.com', '+971-52-555-6666', 'India', 'Malayalam', 'Follow-up', 'Interested in youth ministry', 1, '2024-01-20');

-- Insert sample courses
INSERT OR IGNORE INTO courses (id, title, description, duration_weeks, instructor, church_id, status, start_date, max_students) VALUES
(1, 'Father''s House Bible Study', 'Foundational Bible study for newcomers', 8, 'Pastor Manoj Thomas', 1, 'Active', '2024-01-01', 50),
(2, 'Life in Christ', 'Deeper understanding of Christian living', 12, 'Elder Mary Johnson', 1, 'Active', '2023-12-15', 30),
(3, 'Ministry Orientation School', 'Preparation for ministry deployment', 6, 'Pastor Manoj Thomas', 1, 'Active', '2024-01-08', 25),
(4, 'Leadership Development', 'Training for church leadership roles', 16, 'Elder John Smith', 1, 'Planning', '2024-02-01', 20);

-- Insert sample member course enrollments
INSERT OR IGNORE INTO member_courses (member_id, course_id, enrollment_date, progress, status) VALUES
(3, 1, '2024-01-01', 75, 'Pursuing'),
(4, 2, '2023-12-15', 60, 'Pursuing'),
(5, 3, '2023-11-01', 100, 'Completed'),
(6, 1, '2024-01-08', 45, 'Pursuing'),
(7, 2, '2023-10-01', 100, 'Completed');

-- Insert sample ministries
INSERT OR IGNORE INTO ministries (id, name, description, category, leader_id, church_id, meeting_day, meeting_time, location, status) VALUES
(1, 'Choir Ministry', 'Leading worship through music and song', 'Worship', 4, 1, 'Wednesday', '7:00 PM', 'Main Hall', 'Active'),
(2, 'Teaching Ministry', 'Bible teaching and discipleship', 'Teaching', 1, 1, 'Tuesday', '6:30 PM', 'Conference Room', 'Active'),
(3, 'Outreach Ministry', 'Community outreach and evangelism', 'Outreach', 2, 1, 'Saturday', '9:00 AM', 'Community Center', 'Active'),
(4, 'Prayer Ministry', 'Intercession and prayer support', 'Prayer', 2, 1, 'Friday', '6:00 PM', 'Prayer Room', 'Active'),
(5, 'Youth Ministry', 'Ministry to young people and teenagers', 'Youth', 7, 1, 'Sunday', '4:00 PM', 'Youth Hall', 'Active');

-- Insert sample deployments
INSERT OR IGNORE INTO deployments (member_id, ministry_id, role, mission_field, date_assigned, status) VALUES
(3, 1, 'Vocalist', 'English Service', '2024-01-15', 'Active'),
(4, 2, 'Bible Study Leader', 'Tamil Service', '2023-12-01', 'Active'),
(5, 3, 'Team Leader', 'Community Outreach', '2024-01-08', 'Active'),
(6, 4, 'Intercessor', 'Hindi Service', '2024-01-20', 'Training'),
(7, 5, 'Youth Leader', 'Malayalam Youth', '2023-11-15', 'Active');

-- Insert sample events
INSERT OR IGNORE INTO events (id, title, description, start_date, end_date, start_time, location, category, max_attendees, organizer_id, church_id, status) VALUES
(1, 'Fasting Prayer', 'Three-day fasting and prayer event', '2024-08-01', '2024-08-03', 'Online', 'Zoom Platform', 'Prayer', 200, 1, 1, 'Upcoming'),
(2, 'Water Baptism Service', 'Special baptism service for new believers', '2024-07-27', '2024-07-27', '5:00 PM', 'G2 Hall at Brethren Church Center', 'Baptism', 100, 2, 1, 'Upcoming'),
(3, 'Youth Ministry Meeting', 'Monthly youth gathering and fellowship', '2024-07-30', '2024-07-30', '7:00 PM', 'Youth Hall', 'Youth', 60, 7, 1, 'Upcoming'),
(4, 'Community Outreach', 'Food distribution to local community', '2024-07-20', '2024-07-20', '9:00 AM', 'Community Center', 'Outreach', 80, 5, 1, 'Completed');

-- Insert sample event registrations
INSERT OR IGNORE INTO event_registrations (event_id, member_id, registration_date, status) VALUES
(1, 3, '2024-01-20 10:00:00', 'Registered'),
(1, 4, '2024-01-20 11:30:00', 'Registered'),
(2, 5, '2024-01-21 14:15:00', 'Registered'),
(3, 6, '2024-01-22 09:45:00', 'Registered'),
(3, 7, '2024-01-22 16:20:00', 'Registered');

-- Insert sample attendance records
INSERT OR IGNORE INTO attendance (member_id, service_type, attendance_date, status, church_id) VALUES
-- Week 1
(3, 'English', '2024-01-07', 'Present', 1),
(4, 'Tamil', '2024-01-07', 'Present', 1),
(5, 'English', '2024-01-07', 'Present', 1),
(6, 'Hindi', '2024-01-06', 'Present', 1),
(7, 'Malayalam', '2024-01-07', 'Present', 1),
-- Week 2
(3, 'English', '2024-01-14', 'Present', 1),
(4, 'Tamil', '2024-01-14', 'Absent', 1),
(5, 'English', '2024-01-14', 'Present', 1),
(6, 'Hindi', '2024-01-13', 'Present', 1),
(7, 'Malayalam', '2024-01-14', 'Present', 1),
-- Week 3
(3, 'English', '2024-01-21', 'Absent', 1),
(4, 'Tamil', '2024-01-21', 'Present', 1),
(5, 'English', '2024-01-21', 'Present', 1),
(6, 'Hindi', '2024-01-20', 'Present', 1),
(7, 'Malayalam', '2024-01-21', 'Present', 1);

-- Insert sample prayer requests
INSERT OR IGNORE INTO prayer_requests (id, name, email, phone, subject, message, category, priority, status, assigned_to, church_id, follow_up_date) VALUES
(1, 'Sarah Johnson', 'sarah.j@example.com', '+971-50-123-4567', 'Healing for my mother', 'Please pray for my mother who is undergoing surgery next week. We trust in God''s healing power.', 'Health', 'High', 'New', 1, 1, '2024-01-25'),
(2, 'David Wilson', 'david.w@example.com', '+971-55-987-6543', 'Marriage restoration', 'Requesting prayers for reconciliation with my spouse. We are going through difficult times.', 'Family', 'Medium', 'In Progress', 2, 1, '2024-01-27'),
(3, 'Anonymous', 'anonymous@request.com', NULL, 'Job opportunity', 'Please pray for a job opportunity. I have been unemployed for 3 months and need God''s provision.', 'Financial', 'Medium', 'New', NULL, 1, '2024-01-24'),
(4, 'Maria Santos', 'maria.s@example.com', '+971-52-456-7890', 'Spiritual growth', 'Pray for my spiritual growth and deeper relationship with God.', 'Spiritual', 'Low', 'Completed', 1, 1, '2024-01-21');
