import { FC } from "react";

const Breadcrumbs: FC = () => {
  // Split the current URL path and remove empty strings
  const pathSegments = window.location.pathname.split("/").filter(Boolean);

  return (
    <div className="flex text-xl font-bold">
      <div className="md:hidden">
        {pathSegments.map((segment, index) => (
          <span key={index}>
            {index > 0 && " / "}
            <a href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
              {segment}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
