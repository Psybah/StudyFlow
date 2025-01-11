import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface AccountSettingsProps {
  name: string;
  email: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AccountSettings = ({ name, email, onInputChange }: AccountSettingsProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your personal information and account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={onInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onInputChange}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/auth?type=reset-password")}
        >
          Change Password
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;