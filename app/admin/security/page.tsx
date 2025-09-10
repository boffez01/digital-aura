"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Users,
  Key,
  Lock,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  UserCheck,
  Settings,
} from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "operator"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  twoFactorEnabled: boolean
  permissions: string[]
}

interface SecurityLog {
  id: string
  timestamp: string
  user: string
  action: string
  ip: string
  status: "success" | "failed" | "warning"
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Admin Principale",
    email: "admin@digitalaura.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15 14:30",
    twoFactorEnabled: true,
    permissions: ["all"],
  },
  {
    id: "2",
    name: "Manager Operativo",
    email: "manager@digitalaura.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-15 12:15",
    twoFactorEnabled: false,
    permissions: ["appointments", "customers", "analytics", "services"],
  },
  {
    id: "3",
    name: "Operatore Support",
    email: "support@digitalaura.com",
    role: "operator",
    status: "active",
    lastLogin: "2024-01-15 09:45",
    twoFactorEnabled: false,
    permissions: ["appointments", "customers"],
  },
]

const securityLogs: SecurityLog[] = [
  {
    id: "1",
    timestamp: "2024-01-15 14:30:25",
    user: "admin@digitalaura.com",
    action: "Login successful",
    ip: "192.168.1.100",
    status: "success",
  },
  {
    id: "2",
    timestamp: "2024-01-15 14:25:12",
    user: "unknown@example.com",
    action: "Failed login attempt",
    ip: "203.0.113.45",
    status: "failed",
  },
  {
    id: "3",
    timestamp: "2024-01-15 12:15:33",
    user: "manager@digitalaura.com",
    action: "Accessed customer data",
    ip: "192.168.1.101",
    status: "success",
  },
  {
    id: "4",
    timestamp: "2024-01-15 11:45:18",
    user: "support@digitalaura.com",
    action: "Multiple failed login attempts",
    ip: "192.168.1.102",
    status: "warning",
  },
]

const rolePermissions = {
  admin: {
    name: "Amministratore",
    description: "Accesso completo a tutte le funzionalità",
    permissions: ["all"],
    color: "bg-red-500",
  },
  manager: {
    name: "Manager",
    description: "Gestione operativa e analytics",
    permissions: ["appointments", "customers", "analytics", "services", "notifications"],
    color: "bg-blue-500",
  },
  operator: {
    name: "Operatore",
    description: "Gestione base appuntamenti e clienti",
    permissions: ["appointments", "customers"],
    color: "bg-green-500",
  },
}

export default function SecurityPage() {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "operator" as const,
    twoFactorEnabled: false,
  })
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: true,
    maxAge: 90,
  })

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: "pending",
        lastLogin: "Mai",
        twoFactorEnabled: newUser.twoFactorEnabled,
        permissions: rolePermissions[newUser.role].permissions,
      }
      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "operator", twoFactorEnabled: false })
      setShowAddUser(false)
    }
  }

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: u.status === "active" ? "inactive" : ("active" as any) } : u,
      ),
    )
  }

  const toggle2FA = (userId: string) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, twoFactorEnabled: !u.twoFactorEnabled } : u)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "inactive":
        return "bg-gray-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sicurezza & Accessi</h1>
          <p className="text-gray-600 mt-1">Gestione utenti, ruoli e permessi di sistema</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            {users.filter((u) => u.status === "active").length} Utenti Attivi
          </Badge>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utenti Totali</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">{users.filter((u) => u.status === "active").length} attivi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">2FA Abilitato</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.twoFactorEnabled).length}/{users.length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter((u) => u.twoFactorEnabled).length / users.length) * 100)}% copertura
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tentativi Falliti</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityLogs.filter((l) => l.status === "failed").length}</div>
            <p className="text-xs text-muted-foreground">Ultime 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessioni Attive</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.status === "active" && u.lastLogin !== "Mai").length}
            </div>
            <p className="text-xs text-muted-foreground">Connessi ora</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">Utenti</TabsTrigger>
          <TabsTrigger value="roles">Ruoli & Permessi</TabsTrigger>
          <TabsTrigger value="security">Sicurezza</TabsTrigger>
          <TabsTrigger value="logs">Log Accessi</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Add User */}
          {showAddUser && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Nuovo Utente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Nome Completo</Label>
                    <Input
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Mario Rossi"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="mario@digitalaura.com"
                    />
                  </div>
                  <div>
                    <Label>Ruolo</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value: any) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operator">Operatore</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="admin">Amministratore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newUser.twoFactorEnabled}
                      onCheckedChange={(checked) => setNewUser({ ...newUser, twoFactorEnabled: checked })}
                    />
                    <Label>Abilita 2FA</Label>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleAddUser}>Crea Utente</Button>
                  <Button variant="outline" onClick={() => setShowAddUser(false)}>
                    Annulla
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!showAddUser && (
            <Button onClick={() => setShowAddUser(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Aggiungi Utente
            </Button>
          )}

          {/* Users List */}
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      <Badge className={rolePermissions[user.role].color}>{rolePermissions[user.role].name}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm font-medium">Ultimo Accesso:</span>
                      <p className="text-sm text-gray-600">{user.lastLogin}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">2FA:</span>
                      <p className="text-sm text-gray-600">
                        {user.twoFactorEnabled ? (
                          <span className="text-green-600">✓ Abilitato</span>
                        ) : (
                          <span className="text-red-600">✗ Disabilitato</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Permessi:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.permissions.includes("all") ? (
                          <Badge variant="secondary" className="text-xs">
                            Tutti
                          </Badge>
                        ) : (
                          user.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user.id)}>
                      {user.status === "active" ? "Disattiva" : "Attiva"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggle2FA(user.id)}>
                      {user.twoFactorEnabled ? "Disabilita 2FA" : "Abilita 2FA"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifica
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Elimina
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(rolePermissions).map(([key, role]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className={`w-4 h-4 rounded-full ${role.color} mr-2`}></div>
                    {role.name}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium">Utenti con questo ruolo:</span>
                      <p className="text-lg font-bold">{users.filter((u) => u.role === key).length}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Permessi:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.includes("all") ? (
                          <Badge variant="secondary" className="text-xs">
                            Accesso Completo
                          </Badge>
                        ) : (
                          role.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Policy Password
              </CardTitle>
              <CardDescription>Configura i requisiti di sicurezza per le password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Lunghezza Minima</Label>
                  <Input
                    type="number"
                    value={passwordPolicy.minLength}
                    onChange={(e) =>
                      setPasswordPolicy({
                        ...passwordPolicy,
                        minLength: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Scadenza Password (giorni)</Label>
                  <Input
                    type="number"
                    value={passwordPolicy.maxAge}
                    onChange={(e) =>
                      setPasswordPolicy({
                        ...passwordPolicy,
                        maxAge: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) =>
                      setPasswordPolicy({
                        ...passwordPolicy,
                        requireUppercase: checked,
                      })
                    }
                  />
                  <Label>Richiedi lettere maiuscole</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) =>
                      setPasswordPolicy({
                        ...passwordPolicy,
                        requireNumbers: checked,
                      })
                    }
                  />
                  <Label>Richiedi numeri</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={passwordPolicy.requireSymbols}
                    onCheckedChange={(checked) =>
                      setPasswordPolicy({
                        ...passwordPolicy,
                        requireSymbols: checked,
                      })
                    }
                  />
                  <Label>Richiedi simboli speciali</Label>
                </div>
              </div>
              <Button>
                <Settings className="w-4 h-4 mr-2" />
                Salva Policy
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configurazioni Avanzate</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Blocco automatico account</span>
                  <p className="text-sm text-gray-600">Dopo 5 tentativi falliti</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Timeout sessione</span>
                  <p className="text-sm text-gray-600">30 minuti di inattività</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">Log dettagliati</span>
                  <p className="text-sm text-gray-600">Registra tutte le azioni utente</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Log di Sicurezza
              </CardTitle>
              <CardDescription>Cronologia degli accessi e delle azioni di sicurezza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center space-x-3">
                      {getLogStatusIcon(log.status)}
                      <div>
                        <span className="font-medium">{log.action}</span>
                        <p className="text-sm text-gray-600">
                          {log.user} da {log.ip}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
