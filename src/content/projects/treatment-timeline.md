---
title: "Treatment Timeline"
summary: "Treatment Timeline is a prototype that helps a patient record a mental health medication history in Hindi, English or Hinglish. It turns the answers into a timeline for a clinician and keeps the patient's own words beside each interpretation."
role: "I designed and built Treatment Timeline alone."
sector: "Digital health"
order: 2
isLead: false
methods:
  - "Multilingual extraction"
  - "Safety checks"
  - "Patient confirmation"
githubUrl: "https://github.com/shiwakshir/treatment-timeline"
featured: true
draft: false
---

## The problem

Clinicians need to know which mental health medicines a patient has tried, at what dose and for how long. Routine records often lack this detail, so patients rebuild the history from memory during a short appointment. Many South Asian patients also describe distress in words and body sensations that standard screening tools do not include. A phrase such as "ghabrahat" can mean anxiety, restlessness or a racing heart. Treatment Timeline explores whether a patient-held history in the patient's own language can close part of this gap. No study has yet measured this combined gap directly.

## What it does

A patient adds each medicine with its dose and dates. Every field accepts "I don't know" or more than one possible value. The patient then answers four plain questions about routine, benefit, side effects and stopping.

When a phrase has more than one meaning, the tool shows the patient's exact words and asks the patient to choose a meaning. Before saving, the tool reads back what it understood in the patient's chosen language. The patient confirms it or changes it. Each medicine becomes a card with the facts, the patient's words, the confirmed meanings and the gaps.

## Safety design

Two independent checks read every answer before any other step: a list of urgent phrases in English, Hinglish and Hindi, and a language model classifier. If either check finds urgent content, the interview stops. The tool saves nothing from that answer, and it shows emergency and crisis helplines for the UK and India.

If the classifier cannot give a result, the tool never treats the answer as safe. The read-back comes from fixed sentence templates, not from free text that the model writes.

## What it does not do

The tool records a history. It does not diagnose a condition, recommend a treatment or judge whether a treatment worked.

## Current status

Treatment Timeline is a research prototype. It uses synthetic data only, runs on one computer and sends answers to the Google Gemini API. It is not a medical device, and nobody has clinically validated it.

A test set of 26 synthetic answers passes in full. The set is small and partly AI-written, so it does not show that the safety check is reliable in general. Bilingual clinicians and community members have not yet reviewed the phrase list. Before any use with real people, the project needs ethics approval, a data protection impact assessment and clinical review.
