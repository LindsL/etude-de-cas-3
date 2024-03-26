const Article = require('../api/articles/articles.schema');

jest.setTimeout(35000); // increase timeout to 35 seconds

describe('Test de Validation de l\'Enum', () => {
    it('Devrait enregistrer des articles avec des statuts valides et rejeter les statuts invalides', async () => {
        const timeoutDuration = 10000;
        // Utiliser une promesse pour attendre le résultat du test
        const testPromise = new Promise(async (resolve, reject) => {
            try {
                // Votre code de test ici
                // Si le test est réussi, résoudre la promesse
                resolve();
            } catch (error) {
                // Si une erreur se produit, rejeter la promesse avec l'erreur
                reject(error);
            }
        });
        // Utiliser setTimeout pour définir un délai d'attente
        const timeout = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout: Le test a pris trop de temps pour s\'exécuter.'));
            }, timeoutDuration);
        });
        // Utiliser Promise.race pour exécuter la promesse du test et la promesse de timeout en parallèle
        return Promise.race([testPromise, timeout]);
    });
    try {

        it('devrait enregistrer un article avec le statut "draft" ', async () => {
            const articleDraft = new Article({
                titre: 'Article draft',
                contenu: 'Ceci est un article draft.',
                statut: 'draft',
                utilisateur: '1'
            });
            await articleDraft.save();
            // Vérifier si l'article draft est enregistré
            expect(articleDraft.statut).toBe('draft');
        });


        it('devrait enregister un article avec le statut "published" ', async () => {
            const articlePublished = new Article({
                titre: 'Article Publié',
                contenu: 'Ceci est un article publié.',
                statut: 'published',
                utilisateur: '1'
            });
            await articlePublished.save();
            // Vérifier si l'article publié est enregistré
            expect(articlePublished.statut).to.equal('published');
        });



        it('devrait tenter de créer et enregistrer un article avec un statut invalide', async () => {
            const articleInvalide = new Article({
                titre: 'Article Invalide',
                contenu: 'Cet article a un statut invalide.',
                statut: 'invalide',
                utilisateur: '1'
            });
            await articleInvalide.save(); // Cela devrait générer une erreur
            throw new Error('Ne devrait pas atteindre ce point');
        });

    } catch (erreur) {
        // Vérifier si l'erreur est due à un échec de validation de l'enum
        expect(erreur.errors['statut'].message).to.equal('invalide n\'est pas une valeur enum valide pour le chemin `statut`.');
    }
});
