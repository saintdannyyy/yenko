import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Akua M.",
    role: "Early Tester",
    quote: "Finally, a solution that understands how stressful Accra traffic can be. Can't wait for the full launch!",
    rating: 5,
  },
  {
    name: "Kwesi B.",
    role: "Driver Signup",
    quote: "I drive from East Legon to the office daily. Earning extra on my commute sounds perfect.",
    rating: 5,
  },
  {
    name: "Adwoa K.",
    role: "Waitlist Member",
    quote: "The concept is brilliant. Sharing rides with verified people going the same way — this is the future!",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-3">EARLY FEEDBACK</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            What people are saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
