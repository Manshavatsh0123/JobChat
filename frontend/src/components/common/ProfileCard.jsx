import Image from "next/image";

const ProfileCard = ({ name, role, message, image, offset }) => {
    return (
        <div
            className={`bg-secondary rounded-lg p-6 border border-border hover:shadow-lg transition ${offset ? "ml-12" : ""
                }`}
        >
            <div className="flex items-start gap-4">

                {/*  Profile Image */}
                <Image
                    src={image}
                    alt={name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                    <p className="font-semibold text-foreground">{name}</p>
                    <p className="text-sm text-muted-foreground">{role}</p>
                    <p className="text-sm text-foreground mt-2">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;