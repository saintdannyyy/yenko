import { Link } from "react-router-dom";
import { Button } from "@/components/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yenko-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-yenko-deep mb-4">404</h1>
        <p className="text-2xl text-yenko-muted mb-8">Page not found</p>
        <Link to="/">
          <Button className="bg-yenko-blue hover:bg-yenko-deep">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
