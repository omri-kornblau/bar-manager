export const changePassword =
  [[
    {
      label: "סיסמה ישנה",
      type: "password",
      name: "previosPassword",
      required: true,
    },
  ],
  [
    {
      label: "סיסמה חדשה",
      type: "password",
      name: "newPassword",
      required: true,
    },
  ],
  [
    {
      label: "אימות סיסמה חדשה",
      type: "password",
      name: "reNewPassword",
      required: true,
    },
  ]
];

export const updateAccountDetaild =
  [[
    {
      label: "שם",
      fullWidth: true,
      name: "name",
    },
  ],
  [
    {
      label: "אימייל",
      name: "email",
      type: "email",
      fullWidth: true,
    },
  ],
];
