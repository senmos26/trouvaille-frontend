// ============================================================================
// SCRIPT DE TEST POUR L'AFFICHAGE DES COMMENTAIRES
// ============================================================================

// Ce script peut être exécuté dans la console du navigateur pour tester l'affichage

const testCommentsDisplay = async () => {
  console.log('🧪 Test de l\'affichage des commentaires...');
  
  // Configuration Supabase (remplacer par vos vraies valeurs)
  const SUPABASE_URL = 'https://wtygekrogynrnljacwvw.supabase.co';
  const SUPABASE_ANON_KEY = 'VOTRE_ANON_KEY_ICI';
  
  try {
    // Test 1: Récupérer un article existant
    console.log('📝 Test 1: Récupération d\'un article...');
    const response = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?status=eq.published&limit=1`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    const articles = await response.json();
    if (articles.length === 0) {
      console.error('❌ Aucun article publié trouvé');
      return;
    }
    
    const articleId = articles[0].id;
    console.log('✅ Article trouvé:', articleId);
    
    // Test 2: Récupérer les commentaires (approuvés + en attente)
    console.log('💬 Test 2: Récupération des commentaires...');
    const commentsResponse = await fetch(`${SUPABASE_URL}/rest/v1/blog_comments?post_id=eq.${articleId}&status=in.(approved,pending)`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    
    const comments = await commentsResponse.json();
    console.log('📊 Commentaires trouvés:', comments.length);
    
    // Analyser les commentaires
    const approvedComments = comments.filter(c => c.status === 'approved');
    const pendingComments = comments.filter(c => c.status === 'pending');
    
    console.log('✅ Commentaires approuvés:', approvedComments.length);
    console.log('⏳ Commentaires en attente:', pendingComments.length);
    
    // Afficher les détails
    comments.forEach((comment, index) => {
      console.log(`\n📝 Commentaire ${index + 1}:`);
      console.log(`   - Auteur: ${comment.author_name}`);
      console.log(`   - Email: ${comment.author_email}`);
      console.log(`   - Contenu: ${comment.content.substring(0, 50)}...`);
      console.log(`   - Statut: ${comment.status}`);
      console.log(`   - Date: ${new Date(comment.created_at).toLocaleDateString('fr-FR')}`);
    });
    
    // Test 3: Vérifier l'affichage dans l'interface
    console.log('\n🎨 Test 3: Vérification de l\'affichage...');
    
    // Vérifier si les éléments sont présents dans le DOM
    const commentElements = document.querySelectorAll('[data-testid="comment-item"]');
    console.log(`📊 Éléments de commentaires dans le DOM: ${commentElements.length}`);
    
    // Vérifier les compteurs
    const commentCountElement = document.querySelector('[data-testid="comment-count"]');
    if (commentCountElement) {
      console.log(`📊 Compteur de commentaires: ${commentCountElement.textContent}`);
    }
    
    // Vérifier les commentaires en attente
    const pendingElements = document.querySelectorAll('[data-testid="comment-pending"]');
    console.log(`⏳ Commentaires en attente affichés: ${pendingElements.length}`);
    
    console.log('\n🎉 Tests terminés!');
    console.log('\n📋 VÉRIFICATIONS MANUELLES:');
    console.log('1. Vérifier que les commentaires s\'affichent sur la page');
    console.log('2. Vérifier que les commentaires en attente ont un style différent (fond jaune)');
    console.log('3. Vérifier que le compteur affiche le bon nombre de commentaires');
    console.log('4. Vérifier que les avatars sont générés correctement');
    
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
  }
};

// Exécuter les tests
testCommentsDisplay();

// Instructions d'utilisation:
console.log(`
🔧 INSTRUCTIONS D'UTILISATION:

1. Ouvrir la console du navigateur (F12)
2. Aller sur une page d'article de blog
3. Coller ce script
4. Remplacer 'VOTRE_ANON_KEY_ICI' par votre vraie clé Supabase
5. Exécuter le script

📋 VÉRIFICATIONS:
- Les commentaires approuvés s'affichent normalement
- Les commentaires en attente ont un fond jaune et un badge "En attente"
- Le compteur affiche le bon nombre de commentaires
- Les avatars sont générés correctement
`);
