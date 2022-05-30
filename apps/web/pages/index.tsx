import { Button, Card, LineGraph } from "ui";

export default function Web() {
  return (
    <div>
      <Card>
        <Card.Header title="Card header">Card header</Card.Header>
        <div>
          <LineGraph />
        </div>
        <div>
          <Button>Button</Button>
        </div>
      </Card>
    </div>
  );
}
