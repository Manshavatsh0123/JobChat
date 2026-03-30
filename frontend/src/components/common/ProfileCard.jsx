import Image from "next/image";

const ProfileCard = ({ name, role, message, image, offset }) => {
    return (
        <div
            className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${offset ? "ml-12" : ""
                }`}
            style={{
                background: "linear-gradient(145deg, #ffffff, #f9fafb)",
                borderColor: "#E5E7EB",
            }}>

            <div className="flex items-start gap-4">

                <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="rounded-full object-cover border"
                        style={{ borderColor: "#E5E7EB" }}
                    />
                </div>

                <div className="flex-1 space-y-1">
                    <p className="font-semibold text-[#111827] text-base">
                        {name}
                    </p>

                    <p className="text-xs font-medium text-[#6B7280]">
                        {role}
                    </p>

                    <p className="text-sm leading-relaxed text-[#374151] mt-2">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;