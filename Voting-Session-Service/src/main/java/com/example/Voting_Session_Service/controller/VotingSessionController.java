package com.example.Voting_Session_Service.controller;

import com.example.Voting_Session_Service.model.VotingSession;
import com.example.Voting_Session_Service.service.VotingSessionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sessions")
public class VotingSessionController {

    private final VotingSessionService votingSessionService;

    public VotingSessionController(VotingSessionService votingSessionService) {
        this.votingSessionService = votingSessionService;
    }
    @GetMapping
    public List<VotingSession> getAllSessions() {
        return votingSessionService.getAllSessions();
    }

    @PostMapping
    public VotingSession createSession(@RequestBody VotingSession session) {
        return votingSessionService.createSession(session);
    }

    @GetMapping("/active")
    public VotingSession getActiveSession() {
        return votingSessionService.getActiveSession();
    }

    @GetMapping("/{id}")
    public VotingSession getSessionById(@PathVariable Long id) {
        return votingSessionService.getSessionById(id);
    }
}

