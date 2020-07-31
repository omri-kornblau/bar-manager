import React from "react";
import CustomTable from "../Table/Table";

const OffersTable = props => {
  const {
    offers
  } = props;

  return (
    <CustomTable
      rows={offers}
      columns={[
        { id: "provider", label: "חברה" },
        { id: "price", label: "מחיר מוצע" },
      ]}
      pagination={false}
    />
  )
}

export default OffersTable;
