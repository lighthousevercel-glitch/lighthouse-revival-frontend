import { executeQuery } from "./database"

export interface PrayerRequest {
  id: number
  name: string
  email?: string
  phone?: string
  subject: string
  message: string
  category?: string
  priority: string
  status: string
  assigned_to?: number
  church_id?: number
  follow_up_date?: string
  response_notes?: string
  is_anonymous: boolean
  created_at: string
  updated_at: string
}

export interface PrayerRequestsFilter {
  churchId: number
  status?: string
  category?: string
  priority?: string
  limit?: number
  offset?: number
}

export async function getPrayerRequestsService(filter: PrayerRequestsFilter): Promise<PrayerRequest[]> {
  let sql = `
    SELECT pr.*, m.name as assigned_to_name
    FROM prayer_requests pr
    LEFT JOIN members m ON pr.assigned_to = m.id
    WHERE (pr.church_id = ? OR pr.church_id IS NULL)
  `
  const params: any[] = [filter.churchId]

  if (filter.status) {
    sql += ` AND pr.status = ?`
    params.push(filter.status)
  }

  if (filter.category) {
    sql += ` AND pr.category = ?`
    params.push(filter.category)
  }

  if (filter.priority) {
    sql += ` AND pr.priority = ?`
    params.push(filter.priority)
  }

  sql += ` ORDER BY pr.created_at DESC`

  if (filter.limit) {
    sql += ` LIMIT ?`
    params.push(filter.limit)

    if (filter.offset) {
      sql += ` OFFSET ?`
      params.push(filter.offset)
    }
  }

  const result = await executeQuery(sql, params)
  return result.rows
}

export async function createPrayerRequestService(requestData: Partial<PrayerRequest>): Promise<PrayerRequest> {
  const sql = `
    INSERT INTO prayer_requests (name, email, phone, subject, message, category, priority, 
                               status, church_id, is_anonymous)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const params = [
    requestData.name,
    requestData.email,
    requestData.phone,
    requestData.subject,
    requestData.message,
    requestData.category,
    requestData.priority || "Medium",
    requestData.status || "New",
    requestData.church_id,
    requestData.is_anonymous || false,
  ]

  const result = await executeQuery(sql, params)

  return {
    id: result.rowCount,
    ...requestData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as PrayerRequest
}

export async function updatePrayerRequestService(id: number, updates: Partial<PrayerRequest>): Promise<void> {
  const sql = `
    UPDATE prayer_requests 
    SET status = ?, assigned_to = ?, response_notes = ?, follow_up_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `

  await executeQuery(sql, [updates.status, updates.assigned_to, updates.response_notes, updates.follow_up_date, id])
}
