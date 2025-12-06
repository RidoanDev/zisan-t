import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const isMobile = useIsMobile();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position={isMobile ? "top-left" : "top-right"}
      offset={16}
      gap={8}
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-success !text-success-foreground !border-success/20 !shadow-lg !rounded-xl !text-sm !py-3 !px-4 !min-h-0",
          description: "!text-success-foreground/90",
          actionButton: "!bg-success-foreground !text-success",
          cancelButton: "!bg-success/20 !text-success-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
