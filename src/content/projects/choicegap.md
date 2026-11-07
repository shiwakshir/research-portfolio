---
title: "ChoiceGap"
summary: "ChoiceGap turns a research brief and hypotheses into a survey and an AI-moderated interview. The researcher approves the study before participants take part. Participants can correct the AI's summary, and each finding links to the exact responses."
role: "I designed and built ChoiceGap alone."
sector: "Research methods"
order: 2
isLead: false
award: "Built for the Meta Global AI Developer Hackathon 2026"
methods:
  - "Adaptive surveys"
  - "AI-moderated interviews"
  - "Participant corrections"
githubUrl: "https://github.com/shiwakshir/choicegap"
featured: true
draft: false
---

## The problem

Static surveys cannot follow up on an answer, and human-moderated interviews cost more. ChoiceGap tests a middle route that keeps the researcher in control.

## What it does

A researcher starts from a plain-language brief and hypotheses. ChoiceGap prepares cited background research, an optional concept image, a survey and an interview guide. The researcher edits and approves the study. After approval, ChoiceGap locks the study so that nobody can change it during fieldwork.

Participants complete a survey, a spoken or typed interview, or both. The AI moderator asks a small number of follow-up questions, and each question must stay within the approved topics. At the end, each participant reviews the AI's summary of their answers and corrects it. The corrected version replaces the AI's version.

The researcher then receives findings. Each finding links to the exact responses that support it, and the report also shows competing explanations and proposed next tests.

## Research safeguards

- The researcher approves every question, concept image and comparison before participants see them.
- The application limits the number of follow-up questions in each survey and interview.
- In a comparison task, only one detail changes between two versions of a choice.
- A participant's correction always replaces the AI's summary of that participant's answers.
- A report can contain zero findings. The AI does not have to produce a finding when the evidence is weak.

## Built with

ChoiceGap uses three Meta Muse models. Muse Spark prepares cited research, drafts the study, plans follow-up questions and writes the findings. Muse Image creates and edits concept images. Muse Voice Transcribe converts spoken answers into text in real time.

## Current status

I built ChoiceGap alone for the Meta Global AI Developer Hackathon 2026. I tested it with fictional material, automated tests and simulated participants. I have not tested it in a validated study with real participants. Its results do not establish why a person made a choice.

An earlier part of ChoiceGap chooses comparison questions adaptively. In a simulation with 2,000 participants, it found the main reason for a choice in 91.6% of cases, against 81.1% for a fixed set of questions. In a harder simulation with less consistent participants, the figures were 60.3% and 55.0%. These results come from simulated data, not real people.

ChoiceGap runs on one computer. It stores study data in a local database without encryption, and it sends study content to Meta's model service. Public use needs researcher sign-in, protected participant data and spending limits.
