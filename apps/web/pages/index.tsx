import { Button, Card, LineGraph } from "ui";

export default function Web() {
  return (
    <div>
      <Card>
        <Card.Header title="Card header">Card header</Card.Header>
        <div style={{ height: "550px" }}>
          <LineGraph />
        </div>
        <div>
          <Button>Button</Button>
        </div>
      </Card>
    </div>
  );
}
