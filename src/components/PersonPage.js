import { useParams } from "react-router-dom";

export default function PersonPage() {
  const { personId } = useParams();
  return <div>Actor Page - {personId}</div>;
}
