import _ from "lodash";
import React, {cloneElement} from "react";
import {
  companyTypes,
  companySizes,
} from "../hebrew/client";
import { labels } from "../hebrew/request";

export const clientForm =
  [[
    {
      label: labels.username,
      name: "username",
      type: "text",
      required: true,
    },{
      label: labels.email,
      name: "email",
      type: "email",
      required: true,
    },
  ],[
    {
      label: labels.password,
      name: "password",
      type: "password",
      required: true,
    },{
      label: labels.rePassword,
      name: "rePassword",
      type: "password",
      required: true,
    },
  ],[
    {
      label: labels.name,
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: labels.companyId,
      name: "companyId",
      type: "text",
      required: true,
    }
  ],[
    {
      label: labels.address,
      name: "address",
      type: "text",
      required: true,
    },
    {
      label: labels.phoneNumber,
      name: "phoneNumber",
      type: "text",
      required: true,
    }
  ],[
    {
      label: labels.owner,
      name: "owner",
      type: "text",
      required: true,
    },
    {
      label: labels.fieldOfActivity,
      name: "fieldOfActivity",
      type: "text",
      required: true,
    }
  ],[
    {
      label: labels.companyType,
      name: "companyType",
      type: "select",
      required: true,
      options:  [
        {
          label: "סוג החברה",
          value: "",
          type: "default"
        },
        ..._.map(companyTypes, (value, key) => ({
          label: value,
          value: key
        }))
      ],
    },{
      label: labels.companySize,
      name: "companySize",
      type: "select",
      required: true,
      basedOn: ["companyType"],
      wrapper: props => {
        const {
          companyType
        } = props

        return cloneElement(props.children,  {disabled:companyType !== "private"});
      },
      options: [
        {
          label: "גובה הכנסות",
          value: "",
          type: "default"
        },
        ..._.map(companySizes, (value, key) => ({
          label: value,
          value: key
        }))
      ],
    }
  ]
];

export const providerForm =
  [[
    {
      label: labels.username,
      name: "username",
      type: "text",
      required: true,
    },
    {
      label: labels.email,
      name: "email",
      type: "email",
      required: true,
    },
  ],[
    {
      label: labels.password,
      name: "password",
      type: "password",
      required: true,
    },
    {
      label: labels.rePassword,
      name: "rePassword",
      type: "password",
      required: true,
    },
  ],[
    {
      label: labels.name,
      name: "name",
      type: "text",
      required: true,
    },
    {
      label: labels.contactName,
      name: "contactName",
      type: "text",
      required: true,
    },
  ],[
    {
      label: labels.contactPhone,
      name: "contactPhone",
      type: "text",
      required: true,
    },
    {
      label: labels.contactEmail,
      name: "contactEmail",
      type: "text",
      required: true,
    },
  ]
];
