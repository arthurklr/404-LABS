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

    <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>

<body data-scroll-container>
    <!-- Navigation -->
    <nav class="nav">
        <a href="#" class="nav__logo">
            <div class="logo__glitch">404</div>
            <span class="logo__text">LABS</span>
        </a>
        <div class="nav__menu">
            <a href="#accueil">Accueil</a>
            <a href="#services">Services</a>
            <a href="#projets">Projets</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="accueil" class="hero">
        <div class="hero__container">
            <div class="hero__left">
                <h1 class="hero__title">
                    <span class="hero__title-line">CRÉATIVITÉ</span>
                    <span class="hero__title-line">INNOVATION</span>
                    <span class="hero__title-line">DIGITAL</span>
                </h1>
                
                <div class="hero__text">
                    <p class="hero__lead">
                        Studio digital spécialisé dans la création d'expériences web uniques.
                    </p>
                </div>

                <a href="#projets" class="hero__cta">
                    <span>Découvrir nos projets</span>
                    <span class="cta__arrow">→</span>
                </a>
            </div>

            <div class="hero__right">
                <div class="hero__stats">
                    <div class="stat">
                        <span class="stat__value" data-value="150">150</span>
                        <span class="stat__label">Projets</span>
                    </div>
                    <div class="stat">
                        <span class="stat__value" data-value="98">98</span>
                        <span class="stat__label">Clients</span>
                    </div>
                    <div class="stat">
                        <span class="stat__value" data-value="5">5</span>
                        <span class="stat__label">Prix</span>
                    </div>
                </div>
            </div>
        </div>
        <canvas id="webgl"></canvas>
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