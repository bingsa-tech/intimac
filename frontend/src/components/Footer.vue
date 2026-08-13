<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <!-- Ligne décorative dégradée lumineuse en haut -->
    <div class="footer-top-border"></div>

    <div class="footer-container">

      <div class="footer-section brand-section">
        <h3>🎓 Portail Études</h3>
        <p>Votre plateforme d'orientation et d'accompagnement à l'immigration.</p>
      </div>

      <div class="footer-section">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/register">Inscription</router-link></li>
          <li><router-link to="/login">Connexion</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Contact</h4>
        <p class="contact-item">📧 biljobs@outlook.com</p>
        <p class="contact-item">📞 438-924-8545</p>
      </div>

      <div class="footer-section">
        <h4>Réseaux sociaux</h4>
        <div class="social-icons">
          <a href="#" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
          <a href="#" target="_blank" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
          <a href="#" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a href="#" target="_blank" aria-label="X"><i class="fab fa-x-twitter"></i></a>
          <a href="#" target="_blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Portail Études. Tous droits réservés.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  background-color: #F8FAFC;
  color: #475569;
  padding: 3rem 0 1.5rem;
  border-top: 1px solid #E2E8F0;
}

/* Accent lumineux au sommet du footer */
.footer-top-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563EB 0%, #06B6D4 100%);
}

.footer-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.5rem;
}

/* Titres sombres pour faire ressortir sur le fond clair */
.footer-section h3 {
  color: #0F172A;
  font-size: 1.25rem;
  font-weight: 800;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.footer-section h4 {
  color: #0F172A;
  font-size: 1rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
}

.brand-section p {
  line-height: 1.6;
  font-size: 0.925rem;
  color: #64748B;
}

.contact-item {
  margin: 0.5rem 0;
  font-size: 0.925rem;
  color: #334155;
  font-weight: 500;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.footer-section a {
  color: #64748B;
  text-decoration: none;
  font-size: 0.925rem;
  font-weight: 500;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-block;
}

.footer-section a:hover {
  color: #2563EB;
  transform: translateX(3px);
}

.social-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: #FFFFFF;
  border: 1px solid #E2E8F0;
  color: #0284C7;
  font-size: 1.1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.social-icons a:hover {
  color: #FFFFFF;
  background-color: #2563EB;
  border-color: #2563EB;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.footer-bottom {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #E2E8F0;
  font-size: 0.85rem;
  color: #94A3B8;
}
</style>