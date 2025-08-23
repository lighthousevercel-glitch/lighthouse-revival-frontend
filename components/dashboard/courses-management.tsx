"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Users, Award, Clock, Plus, Eye } from "lucide-react"

export function CoursesManagement() {
  const courses = [
    {
      id: 1,
      title: "Father's House Bible Study",
      description: "Foundational Bible study for newcomers",
      duration: "8 weeks",
      enrolled: 45,
      completed: 32,
      status: "Active",
      instructor: "Pastor Michael",
      nextSession: "2024-01-25",
    },
    {
      id: 2,
      title: "Life in Christ",
      description: "Deeper understanding of Christian living",
      duration: "12 weeks",
      enrolled: 28,
      completed: 15,
      status: "Active",
      instructor: "Elder Mary",
      nextSession: "2024-01-27",
    },
    {
      id: 3,
      title: "Ministry Orientation School",
      description: "Preparation for ministry deployment",
      duration: "6 weeks",
      enrolled: 18,
      completed: 12,
      status: "Active",
      instructor: "Pastor Michael",
      nextSession: "2024-01-26",
    },
    {
      id: 4,
      title: "Leadership Development",
      description: "Training for church leadership roles",
      duration: "16 weeks",
      enrolled: 12,
      completed: 8,
      status: "Planning",
      instructor: "Elder John",
      nextSession: "2024-02-01",
    },
  ]

  const students = [
    {
      name: "John Doe",
      course: "Father's House Bible Study",
      progress: 75,
      status: "Pursuing",
      startDate: "2024-01-01",
      expectedCompletion: "2024-02-26",
    },
    {
      name: "Sarah Wilson",
      course: "Life in Christ",
      progress: 60,
      status: "Pursuing",
      startDate: "2023-12-15",
      expectedCompletion: "2024-03-15",
    },
    {
      name: "Michael Johnson",
      course: "Ministry Orientation School",
      progress: 100,
      status: "Completed",
      startDate: "2023-11-01",
      expectedCompletion: "2023-12-15",
    },
    {
      name: "Priya Sharma",
      course: "Father's House Bible Study",
      progress: 45,
      status: "Pursuing",
      startDate: "2024-01-08",
      expectedCompletion: "2024-03-04",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-yellow-500"
    return "bg-blue-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Courses Management</h2>
          <p className="text-muted-foreground">Manage church courses and track student progress</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Course
        </Button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Courses", value: courses.length, icon: BookOpen, color: "bg-primary" },
          {
            label: "Active Courses",
            value: courses.filter((c) => c.status === "Active").length,
            icon: Clock,
            color: "bg-green-500",
          },
          {
            label: "Total Students",
            value: courses.reduce((sum, c) => sum + c.enrolled, 0),
            icon: Users,
            color: "bg-blue-500",
          },
          {
            label: "Completed",
            value: courses.reduce((sum, c) => sum + c.completed, 0),
            icon: Award,
            color: "bg-purple-500",
          },
        ].map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 ${stat.color} rounded-full flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Courses Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                    </div>
                    <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Instructor:</span>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Enrolled:</span>
                      <p className="font-medium">{course.enrolled} students</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completed:</span>
                      <p className="font-medium">{course.completed} students</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Completion Rate</span>
                      <span className="font-medium">{Math.round((course.completed / course.enrolled) * 100)}%</span>
                    </div>
                    <Progress value={(course.completed / course.enrolled) * 100} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Next Session:</span>
                      <span className="ml-1 font-medium">{course.nextSession}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Student Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Student Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Expected Completion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.progress} className="w-20 h-2" />
                      <span className="text-sm font-medium">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === "Completed" ? "default" : "secondary"}>{student.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{student.startDate}</TableCell>
                  <TableCell className="text-sm">{student.expectedCompletion}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
