/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from 'moment';
import { toAbsoluteUrl } from "../../../_helpers";
import { DropdownCustomToggler, DropdownMenu4 } from "../../dropdowns";
import { Dropdown } from "react-bootstrap";

export function ProjectListViewCard({ className, project }) {
  return (
    <div className={`card card-custom ${className}`}>
      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        <div className="flex-grow-1">
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
          {/* end::Info */}

          {/* begin::Link */}
          <h4
            className="text-dark font-weight-bolder text-hover-primary font-size-h4"
          >
            {
              project.name
            }
          </h4>
          {/* end::Link */}

          {/* begin::Desc */}
          {/* end::Desc */}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary px-10">open</button>

          <div className="d-flex align-items-center">
            {
              project.project_users?.slice(0, 4)?.map(({user}) => (
                <a href="#" key={user.id}>
                  <div className="symbol symbol-light">
                    <img
                      className="rounded-circle neg-margin"
                      src={toAbsoluteUrl('/media/svg/avatars/user.svg')}
                      alt={user.last_name}
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
        </div>
      </div>

      {/* end::Body */}
    </div>
  );
}
