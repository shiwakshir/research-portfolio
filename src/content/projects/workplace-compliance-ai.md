---
title: "Enterprise People and Compliance AI"
summary: "A prototype of an AI gateway that answers workplace policy questions with access controls, citations and guardrail tests."
role: "I designed and built this prototype."
sector: "Applied AI"
order: 5
isLead: false
methods:
  - "Guardrail testing"
  - "Access control"
featured: true
draft: false
---

## The problem

Workplace policy questions can involve confidential data and sensitive personal matters. A general chatbot can give an answer that no approved policy supports.

## What it does

The prototype checks each question before it searches the policies. It limits results by the role, business unit and clearance level of the user. It gives an approved fallback answer when no policy matches. It sends sensitive matters to people, and it requires human approval before a consequential action.

## Current status

The prototype uses synthetic employee data and simulated single sign-on. A script runs 15 guardrail tests. The prototype is not production-secure, and I have not evaluated it with real employees.
