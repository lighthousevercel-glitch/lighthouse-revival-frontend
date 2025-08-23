import { executeQuery } from "./database"

export interface Member {
  id: number
  name: string
  email: string
  phone?: string
  role: string
  status: string
  emirate?: string
  country?: string
  preferred_service?: string
  church_id: number
  joined_at?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface MembersFilter {
  churchId: number
  search?: string
  role?: string
  status?: string
  limit?: number
  offset?: number
}

export async function getMembersService(filter: MembersFilter): Promise<Member[]> {
  let sql = `
    SELECT id, name, email, phone, role, status, emirate, country, 
           preferred_service, church_id, joined_at, notes, created_at, updated_at
    FROM members 
    WHERE church_id = ?
  `
  const params: any[] = [filter.churchId]

  if (filter.search) {
    sql += ` AND (name LIKE ? OR email LIKE ?)`
    params.push(`%${filter.search}%`, `%${filter.search}%`)
  }

  if (filter.role) {
    sql += ` AND role = ?`
    params.push(filter.role)
  }

  if (filter.status) {
    sql += ` AND status = ?`
    params.push(filter.status)
  }

  sql += ` ORDER BY name ASC`

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

export async function getMemberByIdService(id: number): Promise<Member | null> {
  const sql = `
    SELECT id, name, email, phone, role, status, emirate, country, 
           preferred_service, church_id, joined_at, notes, created_at, updated_at
    FROM members 
    WHERE id = ?
  `

  const result = await executeQuery(sql, [id])
  return result.rows[0] || null
}

export async function createMemberService(memberData: Partial<Member>): Promise<Member> {
  const sql = `
    INSERT INTO members (name, email, phone, role, status, emirate, country, 
                        preferred_service, church_id, joined_at, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  const params = [
    memberData.name,
    memberData.email,
    memberData.phone,
    memberData.role || "Active",
    memberData.status || "Active",
    memberData.emirate,
    memberData.country,
    memberData.preferred_service,
    memberData.church_id,
    memberData.joined_at,
    memberData.notes,
  ]

  const result = await executeQuery(sql, params)

  // Return the created member (in a real implementation, you'd fetch it by ID)
  return {
    id: result.rowCount, // Mock ID
    ...memberData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  } as Member
}

export async function updateMemberService(id: number, memberData: Partial<Member>): Promise<Member> {
  const sql = `
    UPDATE members 
    SET name = ?, email = ?, phone = ?, role = ?, status = ?, emirate = ?, 
        country = ?, preferred_service = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `

  const params = [
    memberData.name,
    memberData.email,
    memberData.phone,
    memberData.role,
    memberData.status,
    memberData.emirate,
    memberData.country,
    memberData.preferred_service,
    memberData.notes,
    id,
  ]

  await executeQuery(sql, params)

  // Return the updated member
  return getMemberByIdService(id) as Promise<Member>
}

export async function deleteMemberService(id: number): Promise<void> {
  const sql = `DELETE FROM members WHERE id = ?`
  await executeQuery(sql, [id])
}

export async function getMemberStatsService(churchId: number) {
  const sql = `
    SELECT 
      COUNT(*) as total_members,
      COUNT(CASE WHEN status = 'Active' THEN 1 END) as active_members,
      COUNT(CASE WHEN role = 'Elder' THEN 1 END) as elders,
      COUNT(CASE WHEN role = 'Pastor' THEN 1 END) as pastors,
      COUNT(CASE WHEN joined_at >= date('now', '-30 days') THEN 1 END) as new_members_this_month
    FROM members 
    WHERE church_id = ?
  `

  const result = await executeQuery(sql, [churchId])
  return result.rows[0]
}
