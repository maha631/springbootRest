package com.example.Voting_Session_Service.repository;


import com.example.Voting_Session_Service.model.VotingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VotingSessionRepository extends JpaRepository<VotingSession, Long> {
    List<VotingSession> findByIsClosedFalse(); // Requête pour récupérer les sessions ouvertes
}

