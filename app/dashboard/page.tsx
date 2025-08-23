"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { MembersManagement } from "@/components/dashboard/members-management"
import { NewcomersManagement } from "@/components/dashboard/newcomers-management"
import { AttendanceManagement } from "@/components/dashboard/attendance-management"
import { CoursesManagement } from "@/components/dashboard/courses-management"
import { EventsManagement } from "@/components/dashboard/events-management"
import { PrayerRequestsManagement } from "@/components/dashboard/prayer-requests-management"
import { MinistriesManagement } from "@/components/dashboard/ministries-management"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardOverview />
      case "members":
        return <MembersManagement />
      case "newcomers":
        return <NewcomersManagement />
      case "attendance":
        return <AttendanceManagement />
      case "courses":
        return <CoursesManagement />
      case "events":
        return <EventsManagement />
      case "prayers":
        return <PrayerRequestsManagement />
      case "ministries":
        return <MinistriesManagement />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
