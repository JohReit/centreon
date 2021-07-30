<?php

/*
 * Copyright 2005 - 2020 Centreon (https://www.centreon.com/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * For more information : contact@centreon.com
 *
 */
declare(strict_types=1);

namespace Centreon\Infrastructure\Monitoring\MonitoringResource\API\v2110\Validator;

use Centreon\Domain\Common\Assertion\Assertion;
use Centreon\Infrastructure\Monitoring\MonitoringResource\API\v2110\Validator\Interfaces\MonitoringResourceValidatorInterface;
use Centreon\Infrastructure\Monitoring\MonitoringResource\API\v2110\Validator\Interfaces\MassiveAcknowledgementValidatorInterface;

class MassiveAcknowledgementValidator implements MassiveAcknowledgementValidatorInterface
{
    /**
     * @var MonitoringResourceValidatorInterface[] $monitoringResourceValidators
     */
    private $monitoringResourceValidators = [];

    /**
     * MassiveAcknowledgementValidator constructor
     *
     * @param iterable<MonitoringResourceValidatorInterface> $monitoringResourceValidators
     */
    public function __construct(iterable $monitoringResourceValidators)
    {
        $monitoringResourceValidators = $monitoringResourceValidators instanceof \Traversable
            ? iterator_to_array($monitoringResourceValidators)
            : $monitoringResourceValidators;

        if (count($monitoringResourceValidators) === 0) {
            throw new \InvalidArgumentException(
                _('You must at least add one monitoring resource validator')
            );
        }

        $this->monitoringResourceValidators = $monitoringResourceValidators;
    }

    /**
     * Validates the payload sent for the Acknowledge action
     *
     * @param array<string, mixed> $payload
     * @return void
     */
    public function validateOrFail(array $payload): void
    {
        // Validate the acknowledgement payload
        Assertion::keyExists($payload, 'acknowledgement', 'payload::acknowledgement');

        Assertion::keyExists($payload['acknowledgement'], 'comment', 'payload::acknowledgement::comment');
        Assertion::string($payload['acknowledgement']['comment'], 'payload::acknowledgement::comment');

        Assertion::keyExists($payload['acknowledgement'], 'with_services', 'payload::acknowledgement::with_services');
        Assertion::boolean($payload['acknowledgement']['with_services'], 'payload::acknowledgement::with_services');

        Assertion::keyExists($payload['acknowledgement'], 'is_notify_contacts', 'payload::acknowledgement::is_notify_contacts');
        Assertion::boolean($payload['acknowledgement']['is_notify_contacts'], 'payload::acknowledgement::is_notify_contacts');

        Assertion::keyExists($payload, 'resources', 'payload::resources');

        foreach ($payload['resources'] as $monitoringResource) {
            Assertion::keyExists($monitoringResource, 'type', 'resources::type');
            foreach ($this->monitoringResourceValidators as $monitoringResourceValidator) {
                if ($monitoringResourceValidator->isValidFor($monitoringResource['type'])) {
                    $monitoringResourceValidator->validateOrFail($monitoringResource);
                }
            }
        }
    }
}