/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from 'moment';
import { toAbsoluteUrl } from "../../../_helpers";
import { DropdownCustomToggler, DropdownMenu4 } from "../../dropdowns";
import { Dropdown } from "react-bootstrap";

export function ProjectGridViewCard({ className, project }) {
  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1 pb-5">
          {/* begin::Info */}
          <div className="d-flex align-items-center pr-2 mb-6">
            <span className="text-muted font-weight-bold font-size-lg flex-grow-1">
              { moment(project.created_at).fromNow() }
            </span>
            <div className="card-toolbar">
              <Dropdown className="dropdown-inline" alignRight>
                <Dropdown.Toggle
                  className="btn btn-clean btn-hover-light-primary btn-sm btn-icon"
                  variant="transparent"
                  id="dropdown-toggle-top"
                  as={DropdownCustomToggler}
                >
                  <i className="ki ki-bold-more-hor" />
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                  <DropdownMenu4 />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <h4 className="text-dark font-weight-bolder text-hover-primary font-size-h4">
            { project.name }
          </h4>
        </div>
        <div className="d-flex align-items-center mb-20">
          {
            project.project_users?.slice(0, 4)?.map(({user}) => (
              <a href="#" key={user.id}>
                <div className="symbol symbol-light">
                  <img
                    className="rounded-circle"
                    src={toAbsoluteUrl('/media/svg/avatars/user.svg')}
                    alt={user.full_name}
                  />
                </div>
              </a>
            ))
          }
          {
            !!project.project_users?.slice(5).length && <a href="#">
              <div className="symbol symbol-light">
                <p className="rounded-circle bg-red mt-3">{project.project_users?.slice(5).length}+</p>
              </div>
            </a>
          }
        </div>
        <div>
          <button className="btn btn-primary px-10">open</button>
        </div>
        {/* end::Team */}
      </div>
      {/* end::Body */}
    </div>
  );
}
