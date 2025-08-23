-- Church Management System Database Schema
-- This script creates all the necessary tables for the church management system

-- Users table for authentication and basic user info
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('super_admin', 'admin', 'member')),
    church_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Churches table for multi-church support
CREATE TABLE IF NOT EXISTS churches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    pastor_name TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Members table
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT NOT NULL DEFAULT 'Active' CHECK (role IN ('Active', 'Lifetime', 'Elder', 'Pastor', 'Transferred', 'Relocated')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive', 'Transferred')),
    emirate TEXT,
    country TEXT,
    preferred_service TEXT CHECK (preferred_service IN ('English', 'Tamil', 'Hindi', 'Malayalam')),
    church_id INTEGER NOT NULL,
    joined_at DATE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (church_id) REFERENCES churches(id)
);

-- Newcomers table
CREATE TABLE IF NOT EXISTS newcomers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    language TEXT CHECK (language IN ('English', 'Tamil', 'Hindi', 'Malayalam', 'Urdu')),
    status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Follow-up', 'Rejected')),
    comments TEXT,
    church_id INTEGER NOT NULL,
    assigned_to INTEGER,
    follow_up_date DATE,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (church_id) REFERENCES churches(id),
    FOREIGN KEY (assigned_to) REFERENCES members(id)
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    service_type TEXT NOT NULL CHECK (service_type IN ('English', 'Tamil', 'Hindi', 'Malayalam')),
    attendance_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Present' CHECK (status IN ('Present', 'Absent', 'Late')),
    church_id INTEGER NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (church_id) REFERENCES churches(id),
    UNIQUE(member_id, attendance_date, service_type)
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    duration_weeks INTEGER,
    instructor TEXT,
    church_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Planning', 'Completed', 'Cancelled')),
    start_date DATE,
    end_date DATE,
    max_students INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (church_id) REFERENCES churches(id)
);

-- Member courses (enrollment and progress tracking)
CREATE TABLE IF NOT EXISTS member_courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrollment_date DATE DEFAULT (DATE('now')),
    progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status TEXT NOT NULL DEFAULT 'Pursuing' CHECK (status IN ('Pursuing', 'Completed', 'Dropped')),
    completion_date DATE,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE(member_id, course_id)
);

-- Ministries table
CREATE TABLE IF NOT EXISTS ministries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('Worship', 'Teaching', 'Outreach', 'Prayer', 'Youth', 'Administration')),
    leader_id INTEGER,
    church_id INTEGER NOT NULL,
    meeting_day TEXT,
    meeting_time TEXT,
    location TEXT,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Inactive')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (leader_id) REFERENCES members(id),
    FOREIGN KEY (church_id) REFERENCES churches(id)
);

-- Ministry deployments table
CREATE TABLE IF NOT EXISTS deployments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER NOT NULL,
    ministry_id INTEGER NOT NULL,
    role TEXT,
    mission_field TEXT,
    date_assigned DATE DEFAULT (DATE('now')),
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Training', 'Inactive')),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (ministry_id) REFERENCES ministries(id),
    UNIQUE(member_id, ministry_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TEXT,
    location TEXT,
    category TEXT,
    max_attendees INTEGER,
    organizer_id INTEGER,
    church_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed', 'Cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES members(id),
    FOREIGN KEY (church_id) REFERENCES churches(id)
);

-- Event registrations table
CREATE TABLE IF NOT EXISTS event_registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id INTEGER NOT NULL,
    member_id INTEGER,
    guest_name TEXT,
    guest_email TEXT,
    guest_phone TEXT,
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT NOT NULL DEFAULT 'Registered' CHECK (status IN ('Registered', 'Attended', 'No-show', 'Cancelled')),
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (member_id) REFERENCES members(id)
);

-- Prayer requests table
CREATE TABLE IF NOT EXISTS prayer_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT CHECK (category IN ('Health', 'Family', 'Financial', 'Spiritual', 'Work', 'Other')),
    priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Follow-up', 'Completed', 'Closed')),
    assigned_to INTEGER,
    church_id INTEGER,
    follow_up_date DATE,
    response_notes TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_to) REFERENCES members(id),
    FOREIGN KEY (church_id) REFERENCES churches(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_church_id ON members(church_id);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_attendance_member_date ON attendance(member_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_attendance_church_date ON attendance(church_id, attendance_date);
CREATE INDEX IF NOT EXISTS idx_newcomers_status ON newcomers(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_events_church_date ON events(church_id, start_date);
