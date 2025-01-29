# Epics, Features, and Stories for Invoice Management Application

## Epic: Invoice Review and Management

### Feature: Invoice Review
#### Story: Display List of Invoices
- **As a** user
- **I want to** see a list of all my invoices
- **So that** I can review my billing history

#### Story: View Invoice Details
- **As a** user
- **I want to** view the details of a specific invoice
- **So that** I can see the line items and total amount due

### Feature: Request Changes to Line Items
#### Story: Select Line Item for Change
- **As a** user
- **I want to** select a specific line item on an invoice
- **So that** I can request a change to it

#### Story: Submit Change Request
- **As a** user
- **I want to** submit a request to change a line item
- **So that** the billing department can review and update my invoice

### Feature: Request Full Refund
#### Story: Request Refund for Invoice
- **As a** user
- **I want to** request a full refund for an invoice
- **So that** I can get my money back for incorrect charges

## Epic: Backend Services for Invoice Management

### Feature: Invoice Data Retrieval
#### Story: Fetch List of Invoices
- **As a** backend developer
- **I want to** create an API endpoint to fetch a list of invoices
- **So that** the frontend can display the invoices to the user

#### Story: Fetch Invoice Details
- **As a** backend developer
- **I want to** create an API endpoint to fetch details of a specific invoice
- **So that** the frontend can display the invoice details to the user

### Feature: Handle Change Requests
#### Story: Process Line Item Change Request
- **As a** backend developer
- **I want to** create an API endpoint to handle line item change requests
- **So that** the billing department can review and update the invoice

### Feature: Handle Refund Requests
#### Story: Process Refund Request
- **As a** backend developer
- **I want to** create an API endpoint to handle full refund requests
- **So that** the billing department can process the refund

## Epic: Storage for Invoice Management

### Feature: Invoice Data Storage
#### Story: Store Invoices
- **As a** database administrator
- **I want to** design a database schema to store invoice data
- **So that** invoices can be retrieved and managed efficiently

#### Story: Store Change Requests
- **As a** database administrator
- **I want to** design a database schema to store line item change requests
- **So that** these requests can be tracked and processed

#### Story: Store Refund Requests
- **As a** database administrator
- **I want to** design a database schema to store refund requests
- **So that** these requests can be tracked and processed

### Prompts

```
Translate the business request "Users need an efficient way to Review their invoices, request changes to line items and ask for full refunds" to the format of epics, features and stories with the goal to prototype a three-tier web application (FE,BE,Storage) into .md format
```

```
Create a data model in sql for the stories outlined in #file:feature-requirement.md
```

```
Create api responses in json and OpenAPI specification for the stories outlined in #file:feature-requirement.md  and based on the #file:migrations.sql 
```
