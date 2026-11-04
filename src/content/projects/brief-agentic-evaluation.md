---
title: "BRIEF"
summary: "BRIEF audits what AI already assumes about a research topic, before any fieldwork begins. Eleven specialised agents run on Microsoft Foundry, with Foundry IQ grounding through Azure AI Search."
role: "I designed and built BRIEF alone."
sector: "Applied AI"
order: 1
isLead: true
award: "Hack for Good Award, Microsoft Agents League @ AI Skills Fest 2026"
methods:
  - "Multi-agent system"
  - "Assumption audit"
techStack:
  - "Flask (Python)"
  - "Microsoft Foundry"
  - "Azure AI Search"
githubUrl: "https://github.com/shiwakshir/brief-agent"
featured: true
draft: false
---

## The problem

A growing part of research now starts with an AI model. The answer of the model is not neutral. It reflects the sources that dominated its training data. If a team builds research on that answer without checking it, the team can spend a large budget to confirm an assumption.

## What BRIEF does

A researcher pastes in a plain-language research brief. An orchestrator routes the brief through eleven agents, and each agent has one task. The report shows what AI assumes about the topic, what AI misses, and which client hypotheses repeat AI consensus. It ends with a Research Design Confidence Score from 0 to 100 and method recommendations.

## How to read the result

BRIEF is advisory. A researcher reviews the output before making any fieldwork decision. The score does not replace research judgement.

## Current status

I built this version for the Microsoft Agents League. The source code is public, but this version is not hosted at present.
