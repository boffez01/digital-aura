"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { it, enUS } from "date-fns/locale"
import { CalendarIcon, Clock, User, Phone, MessageSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/app/contexts/language-context"
import { BackToMenu } from "@/app/components/back-to-menu"

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  service: z.string({
    required_error: "Please select a service.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time.",
  }),
  message: z.string().optional(),
})

// Available time slots
const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export default function AppointmentsPage() {
  const { language } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [appointmentType, setAppointmentType] = useState("consultation")

  // Translations
  const t = {
    title: language === "it" ? "Prenota un Appuntamento" : "Book an Appointment",
    subtitle:
      language === "it"
        ? "Prenota una consulenza gratuita con uno dei nostri esperti"
        : "Schedule a free consultation with one of our experts",
    step1: language === "it" ? "Tipo di Appuntamento" : "Appointment Type",
    step2: language === "it" ? "Data e Ora" : "Date & Time",
    step3: language === "it" ? "Informazioni Personali" : "Personal Information",
    consultation: language === "it" ? "Consulenza Generale" : "General Consultation",
    demo: language === "it" ? "Demo Tecnica" : "Technical Demo",
    project: language === "it" ? "Analisi Progetto" : "Project Analysis",
    emergency: language === "it" ? "Supporto Urgente" : "Emergency Support",
    nameLabel: language === "it" ? "Nome Completo" : "Full Name",
    namePlaceholder: language === "it" ? "Inserisci il tuo nome" : "Enter your name",
    emailLabel: language === "it" ? "Email" : "Email",
    emailPlaceholder: language === "it" ? "Inserisci la tua email" : "Enter your email",
    phoneLabel: language === "it" ? "Telefono" : "Phone",
    phonePlaceholder: language === "it" ? "Inserisci il tuo numero" : "Enter your phone number",
    serviceLabel: language === "it" ? "Servizio" : "Service",
    servicePlaceholder: language === "it" ? "Seleziona un servizio" : "Select a service",
    dateLabel: language === "it" ? "Data" : "Date",
    datePlaceholder: language === "it" ? "Seleziona una data" : "Select a date",
    timeLabel: language === "it" ? "Orario" : "Time",
    timePlaceholder: language === "it" ? "Seleziona un orario" : "Select a time",
    messageLabel: language === "it" ? "Messaggio (opzionale)" : "Message (optional)",
    messagePlaceholder:
      language === "it"
        ? "Fornisci dettagli aggiuntivi sulla tua richiesta..."
        : "Provide additional details about your request...",
    next: language === "it" ? "Avanti" : "Next",
    back: language === "it" ? "Indietro" : "Back",
    submit: language === "it" ? "Prenota Appuntamento" : "Book Appointment",
    success:
      language === "it"
        ? "Appuntamento prenotato con successo! Ti abbiamo inviato un'email di conferma."
        : "Appointment booked successfully! We've sent you a confirmation email.",
    aiAutomation: language === "it" ? "AI Automation" : "AI Automation",
    chatbots: language === "it" ? "Smart Chatbots" : "Smart Chatbots",
    webDev: language === "it" ? "Sviluppo Web" : "Web Development",
    aiMarketing: language === "it" ? "AI Marketing" : "AI Marketing",
    other: language === "it" ? "Altro" : "Other",
    duration: language === "it" ? "Durata" : "Duration",
    minutes: language === "it" ? "minuti" : "minutes",
    availability: language === "it" ? "Disponibilità" : "Availability",
    consultationDesc:
      language === "it"
        ? "Discuti le tue esigenze e scopri come possiamo aiutarti"
        : "Discuss your needs and discover how we can help you",
    demoDesc:
      language === "it"
        ? "Vedi in azione le nostre soluzioni con una demo personalizzata"
        : "See our solutions in action with a personalized demo",
    projectDesc:
      language === "it"
        ? "Analisi approfondita del tuo progetto con un nostro esperto"
        : "In-depth analysis of your project with one of our experts",
    emergencyDesc:
      language === "it" ? "Supporto prioritario per problemi urgenti" : "Priority support for urgent issues",
  }

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Here you would typically send the form data to your API
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          appointmentType,
          date: format(values.date, "yyyy-MM-dd"),
          language,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to book appointment")
      }

      toast({
        title: language === "it" ? "Appuntamento Confermato" : "Appointment Confirmed",
        description: t.success,
        duration: 5000,
      })

      // Reset form and go back to step 1
      form.reset()
      setStep(1)
    } catch (error) {
      toast({
        title: language === "it" ? "Errore" : "Error",
        description:
          language === "it"
            ? "Si è verificato un errore. Riprova più tardi."
            : "An error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get appointment type details
  const getAppointmentTypeDetails = () => {
    const types = {
      consultation: {
        title: t.consultation,
        description: t.consultationDesc,
        duration: "30",
        icon: <MessageSquare className="w-10 h-10 text-purple-500" />,
      },
      demo: {
        title: t.demo,
        description: t.demoDesc,
        duration: "45",
        icon: <Clock className="w-10 h-10 text-blue-500" />,
      },
      project: {
        title: t.project,
        description: t.projectDesc,
        duration: "60",
        icon: <User className="w-10 h-10 text-green-500" />,
      },
      emergency: {
        title: t.emergency,
        description: t.emergencyDesc,
        duration: "30",
        icon: <Phone className="w-10 h-10 text-red-500" />,
      },
    }

    return types[appointmentType as keyof typeof types]
  }

  const appointmentDetails = getAppointmentTypeDetails()

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToMenu />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="1" value={step.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="1" disabled={step < 1} onClick={() => step > 1 && setStep(1)}>
              {t.step1}
            </TabsTrigger>
            <TabsTrigger value="2" disabled={step < 2} onClick={() => step > 2 && setStep(2)}>
              {t.step2}
            </TabsTrigger>
            <TabsTrigger value="3" disabled={step < 3} onClick={() => step > 3 && setStep(3)}>
              {t.step3}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["consultation", "demo", "project", "emergency"].map((type) => {
                const isSelected = appointmentType === type
                const typeDetails = {
                  consultation: {
                    title: t.consultation,
                    description: t.consultationDesc,
                    duration: "30",
                    icon: <MessageSquare className="w-10 h-10 text-purple-500" />,
                  },
                  demo: {
                    title: t.demo,
                    description: t.demoDesc,
                    duration: "45",
                    icon: <Clock className="w-10 h-10 text-blue-500" />,
                  },
                  project: {
                    title: t.project,
                    description: t.projectDesc,
                    duration: "60",
                    icon: <User className="w-10 h-10 text-green-500" />,
                  },
                  emergency: {
                    title: t.emergency,
                    description: t.emergencyDesc,
                    duration: "30",
                    icon: <Phone className="w-10 h-10 text-red-500" />,
                  },
                }[type as keyof typeof typeDetails]

                return (
                  <Card
                    key={type}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      isSelected ? "ring-2 ring-purple-500 shadow-md" : "",
                    )}
                    onClick={() => setAppointmentType(type)}
                  >
                    <CardHeader className="flex flex-row items-center gap-4">
                      {typeDetails.icon}
                      <div>
                        <CardTitle>{typeDetails.title}</CardTitle>
                        <CardDescription className="mt-1.5">{typeDetails.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="font-medium">{t.duration}:</span> {typeDetails.duration} {t.minutes}
                        </div>
                        <div>
                          <span className="font-medium">{t.availability}:</span> 24h
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-8 flex justify-end">
              <Button onClick={() => setStep(2)}>{t.next}</Button>
            </div>
          </TabsContent>

          <TabsContent value="2">
            <Card>
              <CardHeader>
                <CardTitle>{appointmentDetails.title}</CardTitle>
                <CardDescription>
                  {t.duration}: {appointmentDetails.duration} {t.minutes}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t.dateLabel}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", {
                                      locale: language === "it" ? it : enUS,
                                    })
                                  ) : (
                                    <span>{t.datePlaceholder}</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                                  date.getDay() === 0 ||
                                  date.getDay() === 6
                                }
                                initialFocus
                                locale={language === "it" ? it : enUS}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            {language === "it" ? "Seleziona una data feriale" : "Select a weekday"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.timeLabel}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.timePlaceholder} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            {language === "it" ? "Gli orari sono nel fuso orario CET" : "Times are in CET timezone"}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Form>
              </CardContent>
            </Card>

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                {t.back}
              </Button>
              <Button
                onClick={() => {
                  const dateValue = form.getValues("date")
                  const timeValue = form.getValues("time")

                  if (!dateValue || !timeValue) {
                    if (!dateValue) form.setError("date", { message: "Please select a date" })
                    if (!timeValue) form.setError("time", { message: "Please select a time" })
                    return
                  }

                  setStep(3)
                }}
              >
                {t.next}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="3">
            <Card>
              <CardHeader>
                <CardTitle>{t.step3}</CardTitle>
                <CardDescription>
                  {language === "it"
                    ? "Inserisci i tuoi dati per completare la prenotazione"
                    : "Enter your details to complete the booking"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.nameLabel}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.namePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.emailLabel}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.emailPlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.phoneLabel}</FormLabel>
                            <FormControl>
                              <Input placeholder={t.phonePlaceholder} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.serviceLabel}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.servicePlaceholder} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="ai-automation">{t.aiAutomation}</SelectItem>
                                <SelectItem value="chatbots">{t.chatbots}</SelectItem>
                                <SelectItem value="web-development">{t.webDev}</SelectItem>
                                <SelectItem value="ai-marketing">{t.aiMarketing}</SelectItem>
                                <SelectItem value="other">{t.other}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.messageLabel}</FormLabel>
                          <FormControl>
                            <Textarea placeholder={t.messagePlaceholder} className="min-h-[120px]" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep(2)}>
                        {t.back}
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            {language === "it" ? "Prenotazione..." : "Booking..."}
                          </div>
                        ) : (
                          t.submit
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
