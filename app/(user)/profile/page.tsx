"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderStatus } from "@/components/user/order-status";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schemas
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  dob: z.string(),
  avatar: z.any().optional(),
});

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const addressFormSchema = z.object({
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zip: z.string().min(3, {
    message: "ZIP must be at least 3 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  isDefault: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type AddressFormValues = z.infer<typeof addressFormSchema>;

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/avatars/01.png",
    joinedDate: "January 2023",
    orders: 12,
    phone: "+1 (555) 123-4567",
    dob: "1990-05-15",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    shippingAddresses: [
      {
        id: "1",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001",
        country: "USA",
        isDefault: true,
      },
      {
        id: "2",
        street: "456 Oak Ave",
        city: "Brooklyn",
        state: "NY",
        zip: "11201",
        country: "USA",
        isDefault: false,
      },
    ],
    recentOrders: [
      {
        id: "ORD-12345",
        date: "2023-10-15",
        status: "delivered",
        items: 3,
        total: 149.99,
      },
      {
        id: "ORD-12344",
        date: "2023-09-28",
        status: "shipped",
        items: 2,
        total: 89.99,
      },
      {
        id: "ORD-12343",
        date: "2023-09-10",
        status: "processing",
        items: 1,
        total: 49.99,
      },
    ],
  };

  // State for managing addresses
  const [addresses, setAddresses] = useState(user.shippingAddresses);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Forms
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const addressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      isDefault: false,
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const editAddressForm = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
  });

  // Form handlers
  function onProfileSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    // Here you would typically make an API call to update the profile
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    console.log("Password updated:", data);
    // Here you would typically make an API call to update the password
    passwordForm.reset();
  }

  function onAddressSubmit(data: AddressFormValues) {
    console.log("Address added:", data);
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...data,
    };

    // If setting as default, unset all other defaults
    if (data.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, newAddress]);
    addressForm.reset();
  }

  function onEditAddressSubmit(data: AddressFormValues) {
    if (!editingAddressId) return;

    console.log("Address updated:", data);

    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === editingAddressId
          ? { ...addr, ...data }
          : data.isDefault
          ? { ...addr, isDefault: false }
          : addr
      )
    );

    setEditingAddressId(null);
    editAddressForm.reset();
  }

  function handleEditAddress(address: (typeof addresses)[0]) {
    setEditingAddressId(address.id);
    editAddressForm.reset({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      isDefault: address.isDefault,
    });
  }

  function handleCancelEdit() {
    setEditingAddressId(null);
    editAddressForm.reset();
  }

  function handleDeleteAddress(id: string) {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card>
            <CardHeader className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <Badge variant="outline" className="mt-2">
                Member since {user.joinedDate}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Orders</span>
                <span className="font-medium">{user.orders}</span>
              </div>
              <Separator />
              <div>
                <h3 className="text-sm font-medium mb-2">Default Address</h3>
                <p className="text-sm text-muted-foreground">
                  {user.address.street}
                  <br />
                  {user.address.city}, {user.address.state} {user.address.zip}
                  <br />
                  {user.address.country}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>

            {/* Profile tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Form {...profileForm}>
                    <form
                      onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your email"
                                {...field}
                                disabled
                              />
                            </FormControl>
                            <FormDescription>
                              Contact support to change your email
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="avatar"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Avatar</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={(e) =>
                                  field.onChange(e.target.files?.[0])
                                }
                                accept="image/*"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CardFooter className="px-0 pb-0">
                        <Button type="submit">Save changes</Button>
                      </CardFooter>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Form {...passwordForm}>
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Current password"
                                autoComplete="true"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="New password"
                                autoComplete="true"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="Confirm new password"
                                autoComplete="true"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <CardFooter className="px-0 pb-0">
                        <Button type="submit">Update Password</Button>
                      </CardFooter>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Address Book Section */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Address Book</CardTitle>
                  <CardDescription>
                    Manage your shipping addresses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {addresses.map((address) => (
                      <div key={address.id} className="border rounded-lg p-4">
                        {editingAddressId === address.id ? (
                          <Form {...editAddressForm}>
                            <form
                              onSubmit={editAddressForm.handleSubmit(
                                onEditAddressSubmit
                              )}
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={editAddressForm.control}
                                  name="street"
                                  render={({ field }) => (
                                    <FormItem className="col-span-2">
                                      <FormLabel>Street Address</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Street address"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editAddressForm.control}
                                  name="city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input placeholder="City" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editAddressForm.control}
                                  name="state"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>State/Province</FormLabel>
                                      <FormControl>
                                        <Input placeholder="State" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editAddressForm.control}
                                  name="zip"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>ZIP/Postal Code</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="ZIP code"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editAddressForm.control}
                                  name="country"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Country"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={editAddressForm.control}
                                  name="isDefault"
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel>
                                          Set as default address
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button
                                  variant="outline"
                                  type="button"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                                <Button type="submit">Save Address</Button>
                              </div>
                            </form>
                          </Form>
                        ) : (
                          <>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">
                                  {address.isDefault && (
                                    <Badge className="mr-2">Default</Badge>
                                  )}
                                  {address.street}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {address.city}, {address.state} {address.zip}
                                  <br />
                                  {address.country}
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditAddress(address)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleDeleteAddress(address.id)
                                  }
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Address</h3>
                    <Form {...addressForm}>
                      <form
                        onSubmit={addressForm.handleSubmit(onAddressSubmit)}
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={addressForm.control}
                            name="street"
                            render={({ field }) => (
                              <FormItem className="col-span-2">
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Street address"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State/Province</FormLabel>
                                <FormControl>
                                  <Input placeholder="State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="zip"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP/Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="ZIP code" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={addressForm.control}
                            name="isDefault"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>Set as default address</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                        <CardFooter className="px-0 pb-0 pt-4">
                          <Button type="submit">Add New Address</Button>
                        </CardFooter>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders tab */}
            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    Your recent orders and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-6">
                      {user.recentOrders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <OrderStatus status={order.status} />
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between">
                            <span className="text-sm">
                              {order.items} {order.items > 1 ? "items" : "item"}
                            </span>
                            <span className="font-medium">
                              ${order.total.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
