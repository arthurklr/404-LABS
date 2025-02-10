<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 LABS | Agence Web Créative</title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <!-- CSS -->
    <link rel="stylesheet" href="css/style.css">

    <!-- Three.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

    <!-- GSAP et ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

    <!-- Locomotive Scroll pour un défilement fluide -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.css">
    <script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@4.1.4/dist/locomotive-scroll.min.js"></script>
</head>

<body data-scroll-container>
    <!-- Navigation -->
    <nav class="nav">
        <div class="nav__logo">404 LABS</div>
        <div class="nav__menu">
            <a href="#accueil">Accueil</a>
            <a href="#services">Services</a>
            <a href="#projets">Projets</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="hero">
        <div class="hero__content">
            <h1 class="hero__title">404 LABS</h1>
            <p class="hero__subtitle">Créons ensemble votre présence numérique</p>
            <div class="hero__scroll-indicator"></div>
        </div>
        <canvas id="webgl"></canvas>
    </section>

    <!-- Section laptop qui contiendra tout le reste du site -->
    <section class="laptop-section">
        <div class="laptop-container">
            <img src="images/laptop-design.png" alt="Laptop" class="laptop-image">
            <div class="laptop-screen">
                <div class="screen-content">
                    <!-- Tout le contenu du site ici -->
                    <section id="services" class="services">
                        <h2>Nos Services</h2>
                        <div class="services__grid">
                            <div class="service-card">
                                <h3>Développement Web</h3>
                                <p>Sites web sur mesure, applications web, e-commerce</p>
                            </div>
                            <div class="service-card">
                                <h3>Design UI/UX</h3>
                                <p>Interfaces modernes et expériences utilisateur uniques</p>
                            </div>
                            <div class="service-card">
                                <h3>Animation & Interaction</h3>
                                <p>Effets visuels, animations GSAP, expériences immersives</p>
                            </div>
                        </div>
                    </section>

                    <section id="projets" class="projets">
                        <h2>Nos Réalisations</h2>
                        <div class="projets__container">
                            <!-- Les projets seront ajoutés dynamiquement via JS -->
                        </div>
                    </section>

                    <section id="contact" class="contact">
                        <h2>Contactez-nous</h2>
                        <form class="contact__form">
                            <input type="text" placeholder="Nom" required>
                            <input type="email" placeholder="Email" required>
                            <textarea placeholder="Votre message" required></textarea>
                            <button type="submit">Envoyer</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <p>&copy; 2024 404 LABS. Tous droits réservés.</p>
    </footer>

    <!-- Scripts -->
    <script src="js/three.min.js"></script>
    <script src="js/main.js"></script>
</body>

</html>