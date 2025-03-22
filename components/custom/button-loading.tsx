import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading({ classes }: { classes?: string }) {
  return (
    <Button disabled className={classes ? classes : ""}>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  );
}
