import { executeQuery } from "./database"

export interface AttendanceRecord {
  id: number
  member_id: number
  member_name?: string
  service_type: string
  attendance_date: string
  status: string
  church_id: number
  notes?: string
  created_at: string
}

export interface AttendanceFilter {
  churchId: number
  startDate?: string
  endDate?: string
  serviceType?: string
  memberId?: number
}

export async function getAttendanceService(filter: AttendanceFilter): Promise<AttendanceRecord[]> {
  let sql = `
    SELECT a.*, m.name as member_name
    FROM attendance a
    JOIN members m ON a.member_id = m.id
    WHERE a.church_id = ?
  `
  const params: any[] = [filter.churchId]

  if (filter.startDate) {
    sql += ` AND a.attendance_date >= ?`
    params.push(filter.startDate)
  }

  if (filter.endDate) {
    sql += ` AND a.attendance_date <= ?`
    params.push(filter.endDate)
  }

  if (filter.serviceType) {
    sql += ` AND a.service_type = ?`
    params.push(filter.serviceType)
  }

  if (filter.memberId) {
    sql += ` AND a.member_id = ?`
    params.push(filter.memberId)
  }

  sql += ` ORDER BY a.attendance_date DESC, a.service_type`

  const result = await executeQuery(sql, params)
  return result.rows
}

export async function recordAttendanceService(attendanceData: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
  const sql = `
    INSERT OR REPLACE INTO attendance (member_id, service_type, attendance_date, status, church_id, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `

  const params = [
    attendanceData.member_id,
    attendanceData.service_type,
    attendanceData.attendance_date,
    attendanceData.status || "Present",
    attendanceData.church_id,
    attendanceData.notes,
  ]

  const result = await executeQuery(sql, params)

  return {
    id: result.rowCount,
    ...attendanceData,
    created_at: new Date().toISOString(),
  } as AttendanceRecord
}

export async function getAttendanceStatsService(churchId: number, startDate?: string, endDate?: string) {
  const sql = `
    SELECT 
      service_type,
      COUNT(*) as total_records,
      COUNT(CASE WHEN status = 'Present' THEN 1 END) as present_count,
      COUNT(CASE WHEN status = 'Absent' THEN 1 END) as absent_count,
      ROUND(COUNT(CASE WHEN status = 'Present' THEN 1 END) * 100.0 / COUNT(*), 2) as attendance_rate
    FROM attendance 
    WHERE church_id = ?
    ${startDate ? "AND attendance_date >= ?" : ""}
    ${endDate ? "AND attendance_date <= ?" : ""}
    GROUP BY service_type
    ORDER BY service_type
  `

  const params = [churchId]
  if (startDate) params.push(startDate)
  if (endDate) params.push(endDate)

  const result = await executeQuery(sql, params)
  return result.rows
}

export async function getAbsenteesService(churchId: number, weeksThreshold = 2): Promise<any[]> {
  const sql = `
    SELECT 
      m.id,
      m.name,
      m.email,
      m.phone,
      m.preferred_service,
      MAX(a.attendance_date) as last_attended,
      COUNT(CASE WHEN a.attendance_date >= date('now', '-${weeksThreshold} weeks') AND a.status = 'Absent' THEN 1 END) as weeks_absent
    FROM members m
    LEFT JOIN attendance a ON m.id = a.member_id
    WHERE m.church_id = ? AND m.status = 'Active'
    GROUP BY m.id, m.name, m.email, m.phone, m.preferred_service
    HAVING last_attended IS NULL OR last_attended < date('now', '-${weeksThreshold} weeks')
    ORDER BY last_attended ASC NULLS FIRST
  `

  const result = await executeQuery(sql, [churchId])
  return result.rows
}
