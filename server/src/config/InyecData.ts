import { PrismaClient} from "@prisma/client";

const prisma=new PrismaClient()

async function Users() {

    try {
        const post=[
            {title: "Saludo matutino", content: "¿Qué tal está su día, amigos? Yo estoy disfrutando de una buena taza de café.", userId: 1},
            {title: "Pensamientos del día", content: "Fusce mollis magna id tortor finibus, sed ultricies nunc rhoncus. Maecenas in purus non justo iaculis aliquam.", userId: 1},
            {title: "¡Hola a todos!", content: "¡Hola a todos! ¿Cómo están? ¿Alguien tiene planes interesantes para hoy?", userId: 2},
            {title: "Compartiendo experiencias", content: "¡Feliz de compartir un poco de mi día con ustedes! ¿Qué actividades están haciendo?", userId: 2},
            {title: "Inicio del día", content: "Buenos días, queridos amigos. ¿Cómo están? ¿Alguna recomendación para pasar el día?", userId: 3},
            {title: "¡Momentos felices!", content: "Espero que estén teniendo un excelente día. ¿Alguien quiere compartir lo que están haciendo?", userId: 3},
            {title: "Saludos a todos", content: "¡Saludos a todos! ¿Qué tal su día? ¿Han descubierto algo interesante últimamente?", userId: 4},
            {title: "Actividades del día", content: "Estoy pasando un buen día, espero que ustedes también. ¿Alguna actividad divertida que compartir?", userId: 4},
            {title: "¡Hola amigos!", content: "¡Hola a todos! ¿Cómo están? ¿Alguno ha hecho algo emocionante hoy?", userId: 5},
            {title: "Momentos de felicidad", content: "Espero que estén disfrutando del día tanto como yo. ¿Alguna experiencia interesante que compartir?", userId: 5},
            {title: "Día animado", content: "¿Qué tal su día, amigos? Espero que estén teniendo una jornada llena de momentos felices.", userId: 6},
            {title: "¡Hola a todos!", content: "¡Hola a todos! ¿Qué están haciendo en este hermoso día? ¿Alguna actividad divertida?", userId: 6},
            {title: "Buenos días", content: "¡Buenos días! ¿Cómo van sus jornadas? ¿Algún plan emocionante para hoy?", userId: 7},
            {title: "Momentos de descubrimiento", content: "¡Espero que estén teniendo un día maravilloso! ¿Han descubierto algo nuevo recientemente?", userId: 7},
            {title: "¡Hola a todos!", content: "¡Hola a todos! ¿Qué tal está su día? ¿Alguna experiencia emocionante que compartir?", userId: 8},
            {title: "Compartiendo mi día", content: "¡Feliz de compartir un poco de mi día con ustedes! ¿Alguno ha probado algo nuevo últimamente?", userId: 8},
            {title: "Saludos a todos", content: "¡Saludos a todos! ¿Cómo están? ¿Alguna actividad interesante que hayan realizado hoy?", userId: 9},
            {title: "Momentos de reflexión", content: "Espero que estén pasando un día fantástico. ¿Algún descubrimiento que quieran compartir?", userId: 9},
            {title: "¡Buenos días!", content: "¡Buenos días a todos! ¿Qué tal está su día? ¿Alguna aventura que contar?", userId: 10},
            {title: "¡Hola amigos!", content: "¡Hola amigos! Espero que su día esté siendo tan genial como el mío. ¿Alguna historia interesante para compartir?", userId: 10}
          ]
          
          
        const users=[
            {name: "Robert Smith", username: "rsmith", email: "rsmith@example.com", password: "aBcDeF123!", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "John Doe", username: "jdoe", email: "jdoe@example.com", password: "P@ssw0rd456", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Lisa Johnson", username: "ljohnson", email: "ljohnson@example.com", password: "SecurePass789", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Michael Williams", username: "mwilliams", email: "mwilliams@example.com", password: "Random123!", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Tom Jackson", username: "tjackson", email: "tjackson@example.com", password: "Password!987", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Beth Garcia", username: "bgarcia", email: "bgarcia@example.com", password: "Secret@456", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Alice Phillips", username: "aphillips", email: "aphillips@example.com", password: "Test123!", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Brian Hall", username: "bhall", email: "bhall@example.com", password: "Passw0rd!", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "William Lee", username: "wlee", email: "wlee@example.com", password: "SecurePass123", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"},
            {name: "Emily Hernandez", username: "ehernandez", email: "ehernandez@example.com", password: "Password123!", image: "https://www.testhouse.net/wp-content/uploads/2021/11/default-avatar.jpg"}
          ]
          
        
        await prisma.user.createMany({data:users})
        console.log("Users created");
        await prisma.post.createMany({data:post})
        console.log("posts created");
            
    } catch (error) {
        console.error("Error al crear usuarios", error);
    }
    await prisma.$disconnect();
}

Users()