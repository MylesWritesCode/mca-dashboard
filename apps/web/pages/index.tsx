import { Button, Card} from "ui";

export default function Web() {
  return (
    <div>
      <Card>
        <Card.Header title="Card header">Card header</Card.Header>
        <div className="w-36 h-36">
        </div>
        <div>
          <Button>Button</Button>
        </div>
      </Card>
    </div>
  );
}
