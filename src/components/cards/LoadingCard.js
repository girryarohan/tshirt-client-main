import React from "react";
import { Card, Skeleton } from "antd";
function LoadingCard({ count }) {
  const cards = () => {
    let totalCards = [];
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card className="col-md-4" key={i}>
          <Skeleton active />
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row pn-5">{cards()}</div>;
}

export default LoadingCard;
