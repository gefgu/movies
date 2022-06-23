import { useParams } from "react-router-dom";

export default function SearchPage() {
  const searchQuery = useParams().searchQuery.replaceAll("+", " ");

  return <div>{searchQuery}</div>;
}
