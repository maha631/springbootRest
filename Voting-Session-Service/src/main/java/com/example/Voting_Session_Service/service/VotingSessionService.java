package com.example.Voting_Session_Service.service;

import com.example.Voting_Session_Service.client.DishClient;
import com.example.Voting_Session_Service.model.Dish;
import com.example.Voting_Session_Service.model.VotingSession;
import com.example.Voting_Session_Service.repository.VotingSessionRepository;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class VotingSessionService {
    private static final Logger logger = LoggerFactory.getLogger(VotingSessionService.class);

    private final DishClient dishClient;
    private final VotingSessionRepository votingSessionRepository;

    public VotingSessionService(DishClient dishClient, VotingSessionRepository votingSessionRepository) {
        this.dishClient = dishClient;
        this.votingSessionRepository = votingSessionRepository;
    }

    /**
     * Créer une nouvelle session de vote
     *
     * @param session : Objet VotingSession contenant les informations de la session (dates, plats sélectionnés)
     * @return la session de vote créée
     */


    public VotingSession createSession(VotingSession session) {
        logger.info("Création d'une nouvelle session : {}", session);

        List<Dish> dishes = dishClient.getAllDishes();
        logger.info("Plats récupérés depuis Dish Management Service : {}", dishes);

        if (dishes == null || dishes.size() < 3) {
            logger.error("Pas assez de plats disponibles pour créer une session !");
            throw new IllegalStateException("Pas assez de plats disponibles.");
        }

        session.setDishes(dishes.subList(0, 3));
        session.setClosed(false);
        logger.info("Session configurée : {}", session);

        return votingSessionRepository.save(session);
    }

    public List<VotingSession> getAllSessions() {
        return votingSessionRepository.findAll();
    }

    /**
     * Obtenir la session active (si elle existe)
     *
     * @return la session active
     */
    public VotingSession getActiveSession() {
        // Récupérer toutes les sessions ouvertes depuis la base de données
        List<VotingSession> activeSessions = votingSessionRepository.findByIsClosedFalse();

        // Vérifier si une session est active (en fonction de la date actuelle)
        LocalDate today = LocalDate.now();
        for (VotingSession session : activeSessions) {
            if (!session.getStartDate().isAfter(today) && !session.getEndDate().isBefore(today)) {
                return session; // Retourner la session active
            }
        }

        // Si aucune session n'est active, lever une exception
        throw new IllegalStateException("Aucune session de vote active pour le moment !");
    }

    /**
     * Obtenir une session de vote par son ID
     *
     * @param id : ID de la session de vote
     * @return la session de vote correspondante
     */
    public VotingSession getSessionById(Long id) {
        // Chercher la session par ID dans la base de données
        Optional<VotingSession> session = votingSessionRepository.findById(id);

        // Retourner la session si elle existe
        if (session.isPresent()) {
            return session.get();
        } else {
            throw new IllegalArgumentException("Aucune session trouvée avec l'ID : " + id);
        }
    }
}
