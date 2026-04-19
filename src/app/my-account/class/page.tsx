import { redirect } from "next/navigation";
import { getMyAccountUser, getMyClasses } from "@/lib/my-account/queries";

type ScheduleRow = { dayOfWeek: string; startTime: number; duration: number };

function formatTime(startTime: number, duration: number): string {
  const startH = Math.floor(startTime);
  const startM = Math.round((startTime - startH) * 60);
  const endTime = startTime + duration;
  const endH = Math.floor(endTime);
  const endM = Math.round((endTime - endH) * 60);
  return `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")} - ${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}

function formatSchedule(schedules: ScheduleRow[]): string {
  if (!schedules.length) return "시간표 미정";
  const days = schedules.map((s) => s.dayOfWeek).join(", ");
  const first = schedules[0];
  return `매주 ${days} ${formatTime(first.startTime, first.duration)}`;
}

export default async function ClassPage() {
  const user = await getMyAccountUser();
  if (!user) redirect("/login");

  const enrollments = await getMyClasses(user.id);
  const activeCount = enrollments.filter((e) => e.class.isActive).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">나의 수업</h1>
          <p className="mt-1 text-gray-500">수강 중인 과목과 수업 현황을 확인하세요.</p>
        </div>
        {enrollments.length > 0 && (
          <div className="hidden sm:flex space-x-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              전체 {enrollments.length}
            </span>
            {activeCount > 0 && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                수강중 {activeCount}
              </span>
            )}
          </div>
        )}
      </div>

      {enrollments.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-700">등록된 수업이 없습니다.</p>
          <p className="text-sm text-gray-400 mt-1">학원에 문의하여 수강 신청을 완료해 주세요.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => {
            const cls = enrollment.class;
            const isActive = cls.isActive;
            const teacherNames = cls.teachers.map((t) => t.teacher.name).join(", ");
            const scheduleText = formatSchedule(cls.schedules);

            return (
              <div
                key={enrollment.classId}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-base text-white shrink-0"
                    style={{ backgroundColor: cls.color }}
                  >
                    {cls.subjects[0]?.slice(0, 2) || cls.name.slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {isActive ? "수강중" : "종료"}
                      </span>
                      {teacherNames && (
                        <span className="text-sm font-medium text-gray-500">
                          {teacherNames}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 truncate">{cls.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{scheduleText}</p>
                    {cls.subjects.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cls.subjects.map((s) => (
                          <span
                            key={s}
                            className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                        {cls.levels.map((l) => (
                          <span
                            key={l}
                            className="text-xs px-2 py-0.5 bg-orange-50 text-orange-600 rounded-md"
                          >
                            {l}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
