# Reunion Housing Process

## Overview

This document provides a comprehensive description of the process used in Slate to manage Reunion Housing registrations and assignments through the [Reunion Housing Portal](https://connect.williams.edu/portal/Reunion-Housing).

## Table of Contents

1. Introduction
2. Housing Assignment Portal
    - Dashboard
    - Buildings
    - Unassigned
    - Assignment Process
    - Assignments
3. Fixes/Outliers
4. Future Updates

## 1. Introduction

When individuals register for Reunion and select Housing, they are enrolled for both the reunion and the housing subevent upon submission. The subevent is available here: [Housing Subevent](https://connect.williams.edu/manage/event/form?id=90e4952d-e02b-4739-bcb9-cb5c89b59628).

If a registrant cancels, their related subevent is also canceled. This subevent effectively tracks all records requesting housing for Reunion 2024. These records are categorized as unassigned registrants.

We have created records for each bed on campus, linking a person record to a bed record.

To facilitate this link, we use a form: [Housing Assignment Form](https://connect.williams.edu/manage/form/form?id=122f62d2-88ee-4961-b264-01b381e49378), specifically for Reunion 2024.

This process generates a row on the person's record, providing a history of their housing across different Reunions.

The portal integrates all these elements seamlessly.

## 2. Housing Assignment Portal

### Dashboard

- **Purpose**: Provides an overview of the current state of Reunion housing.
- Includes data such as available rooms, requests over time, assignments, and outliers.

### Buildings

- Lists all active buildings with available rooms.
- Viewing a building displays a list of rooms in that building and all unassigned registrants.

### Unassigned

- Allows direct viewing of all unassigned registrants for assignment without going through the Buildings tab.

### Assignment Process

- In a building view, you can select a room and click "assign" next to the desired record.
- A pop-up with the record's information will appear.
- Select "Assigned," add any necessary comments, and submit the form.
- Using the Unassigned tab, type the bed name, select it from the dropdown, click "assign," and submit.

### Assignments

- Displays all assignments managed through the form linking a bed and a record for Reunion 2024.
- You can click "update" to modify the row on the person's record.
- Note: Updating creates another row for the same reunion year; the old row will be deleted at midnight.

## 3. Fixes/Outliers

We address eight main use cases:

1. Registered, Assigned, Room Booked - Ideal Case
2. Registered, Assigned, No Room Booked - Error in form entry
3. Registered, Not Assigned, Room Booked - Canceled assignment without canceling registration
4. Registered, Not Assigned, No Room Booked - Ideal Case (Unassigned)
5. Not Registered (Canceled), Assigned, Room Booked - Canceled after assigning
6. Not Registered (Canceled), Assigned, No Room Booked - Canceled after an error in form entry
7. Not Registered (Canceled), Not Assigned, Room Booked - Rare, usually during testing
8. Not Registered (Canceled), Not Assigned, No Room Booked - Ideal Case

Other cases include:

1. Registered for housing but not for Reunion.
2. Different registrants assigned to the same room.
3. Blank rows (fixed by overnight retention policy).
4. Multiple rooms assigned to one registrant for the same year (fixed by overnight retention policy).
5. Assignments to inactive rooms.

## 4. Future Updates

1. Add population data to the room search dropdown to prevent assigning inactive rooms.
2. Include room details (accessibility, type, etc.).
3. Add reunion year to buildings for quicker navigation.
4. Incorporate floor plans.

This document serves as a guide to the current process of managing event registrations and housing assignments within Slate.
