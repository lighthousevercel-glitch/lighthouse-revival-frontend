import { executeQuery } from "./database"

export interface Newcomer {
  id: number
  name: string
  email: string
  phone?: string
  country?: string
  language?: string
  status: string
  comments?: string
  church_id: number
  assigned_to?: number
  follow_up_date?: string
  submitted_at: string
  updated_at: string
}

export interface NewcomersFilter {
  churchId: number
  status?: string
  limit?: number
  offset?: number
}

export async function getNewcomersService(filter: NewcomersFilter): Promise<Newcomer[]> {
  let sql = `
    SELECT n.*, m.name as assigned_to_name
    FROM newcomers n
    LEFT JOIN members m ON n.assigned_to = m.id
    WHERE n.church_id = ?
  `
  const params: any[] = [filter.churchId]

  if (filter.status) {
    sql += ` AND n.status = ?`
    params.push(filter.status)
  }

  sql += ` ORDER BY n.submitted_at DESC`

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

export async function createNewcomerService(newcomerData: Partial<Newcomer>): Promise<Newcomer> {
  const sql = `
    INSERT INTO newcomers (name, email, phone, country, language, status, comments, church_id, follow_up_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const params = [
    newcomerData.name,
    newcomerData.email,
    newcomerData.phone,
    newcomerData.country,
    newcomerData.language,
    newcomerData.status || "Pending",
    newcomerData.comments,
    newcomerData.church_id,
    newcomerData.follow_up_date,
  ]

  const result = await executeQuery(sql, params)

  return {
    id: result.rowCount,
    ...newcomerData,
    submitted_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Newcomer
}

export async function updateNewcomerStatusService(id: number, status: string, assignedTo?: number): Promise<void> {
  const sql = `
    UPDATE newcomers 
    SET status = ?, assigned_to = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `

  await executeQuery(sql, [status, assignedTo, id])
}
