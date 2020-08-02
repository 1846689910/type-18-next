import React from "react";
import { Button } from "@material-ui/core";
import { useRouter } from "next/router";

type TabButtonProps = {
  route: {
    key: string;
    label: string;
    path: string;
    routes?: {
      fileIds: number[];
      path: string;
    };

  };
  handleClick: (path: string) => void;
  classes: Record<string, string>;
};

/**
 *
 * @description regular tab button
 */
export default function TabButton({ route, handleClick, classes }: TabButtonProps) {
  const router = useRouter();
  return (
    <Button
      className={classes.btnGroup}
      variant="contained"
      color={route.path === router.pathname ? "secondary" : "default"}
      onClick={() => handleClick(route.path)}
    >
      {route.label}
    </Button>
  );
}
