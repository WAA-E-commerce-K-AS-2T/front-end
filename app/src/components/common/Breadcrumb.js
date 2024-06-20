import React from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="text-md text-gray-700 mb-4 flex items-center space-x-1 ">
      {breadcrumbs.map(({ breadcrumb, match }, index) => (
        <React.Fragment key={index}>
          <Link to={match.pathname} className="hover:underline">
            {breadcrumb}
          </Link>
          {index < breadcrumbs.length - 1 && <span className="mx-1">/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
