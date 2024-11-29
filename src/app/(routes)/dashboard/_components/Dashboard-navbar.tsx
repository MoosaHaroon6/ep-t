import { UserButton } from "@clerk/nextjs";

export default function DashboardNavbar() {
    return (
        <div className="p-5 shadow-sm border-b flex justify-end w-full">
            <div><UserButton /></div>
        </div>
    )
}