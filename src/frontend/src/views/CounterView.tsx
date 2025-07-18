import { useState, useEffect } from "react";
import { Button, Card } from "../components/Archieved";
import { sharedService } from "../services/sharedService";

interface CounterViewProps {
  onError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

/**
 * CounterView component for handling the counter functionality
 */
export function CounterView({ onError, setLoading }: CounterViewProps) {
  const [count, setCount] = useState<bigint>(BigInt(0));

  const fetchCount = async () => {
    try {
      setLoading(true);
      const res = await sharedService.getCount();
      setCount(res);
    } catch (err) {
      console.error(err);
      onError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const incrementCounter = async () => {
    try {
      setLoading(true);
      const res = await sharedService.incrementCounter();
      setCount(res);
    } catch (err) {
      console.error(err);
      onError(String(err));
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial count when component mounts
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <Card title={`Counter: ${count.toString()}`}>
      <Button onClick={incrementCounter}>Increment</Button>
      <Button onClick={fetchCount}>Refresh Count</Button>
    </Card>
  );
}
